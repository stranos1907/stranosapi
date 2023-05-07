import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Page } from 'src/app/service/Page';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.page.pageNumber = 0;
    this.pageNumber = 1;
    this.page.size = 10;
  }
  page = new Page;
  data: any = [];
  isLoading = false;
  searchText
  pageNumber;
  search() {
    this.page.pageNumber = 0
    this.isLoading = true;
    this.getPageConfig();
  }



  ngOnInit(): void {
    this.getPageConfig();
  }




  getPageConfig() {
    this.userService.getUserPage({ key: this.searchText, limit: this.page.size, withPassive: true }, (result: any) => {
      this.isLoading = false;
      this.page.totalElements = result.totalElements;
      this.page.totalPages = result.totalPages;
      this.setPage({ offset: 0 });
    });
  }
  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset;
    this.getCustomerList();
  }

  setPage2(pageNumber: number) {
    this.setPage({ offset: pageNumber });
  }

  getCustomerList() {
   this.data=[];
    this.isLoading = true;
    let params;

    params = {
      key: this.searchText,
      limit: this.page.size,
      skip: this.page.size * this.page.pageNumber,
      withPassive: true
    };
    this.userService.getUserList(
      params,
      (result: any) => {
        this.data = result;
        this.isLoading = false;
      }
    );
  }

  isVip(row){
    let start = new Date(row.vipStart)
    let end = new Date(row.vipEnd)
    let now = new Date()
    if (start <= now && end >= now) {
      return true
    }
    return false
  }

  sendMessage(row) {
    this.router.navigate(['/send'], { queryParams: { userId: row._id } });
  }

  async addCoins(row) {
    const { value: price } = await Swal.fire({
      title: 'Jeton Ekle',
      input: 'number',
      inputAttributes: {
        pattern: "([0-9])"
      },
      inputLabel: 'Eklenecek Tutar',
      inputPlaceholder: '',
      inputValidator: (value) => {
        var test = /^-?\d*\.{0,1}\d+$/.test(value);
        if (!value) {
          return 'Lütfen Miktar Girin!'
        } else if (!test) {
          return 'Lütfen Geçerli Bir Miktar Girin!'
        } else {
          return null
        }
      }
    })

    if (price == null)
      return
    var test = /^-?\d*\.{0,1}\d+$/.test(price);
    if (!test)
      return

    this.userService.addCoins({ _id: row._id, coins: price }, result => {
      row.coins = result.coins;
      Swal.fire({
        title: 'Jeton Eklendi',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      });
    })

  }

  banUser(row) {

    var title = ""
    var text = ""
    if (row.banned) {
      title = "Kullanıcı engelini Kaldır"
      text = "Kullanıcı engelini kaldırmak istediğinize emin misiniz? Kullanıcı tekrar sisteme giriş yapabilir."
    } else {
      title = "Kullanıcıyı Engelle"
      text = "Engellenen kullanıcı uygulamayı bu hesapla bir daha kullanamaz işlem geri alınabilir."
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.toggleBan({ _id: row._id }, result => {
          Swal.fire({
            title: 'İşlem Tamamlandı',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          this.setPage({ offset: this.page.pageNumber });
        })
      }
    });
  }


  customerToggle(row: any) {
    this.userService.toogle({ _id: row._id }, (result: any) => {
      row.active = result.active;
    });
  }
  delete(_id) {
    Swal.fire({
      title: 'Silme İşlemi Onaylayın',
      text: "Kullanıcı silme işlemini lütfen onaylayın. Bu işlem geri alınamaz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete('slider', { _id }, result => {

          Swal.fire({
            title: 'Kullanıcı Silinmiştir',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          this.setPage({ offset: this.page.pageNumber });
        })

      }
    });
  }
}

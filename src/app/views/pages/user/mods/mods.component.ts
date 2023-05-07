import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Page } from 'src/app/service/Page';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.scss']
})
export class ModsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {  
  }

  data: any = [];
  isLoading = false;
  searchText

  search() {
    this.isLoading = true;
    this.getCustomerList();
  }



  ngOnInit(): void {
    this.getCustomerList()
  }


  getCustomerList() {
   this.data=[];
    this.isLoading = true;
    let params;

    params = {
      key: this.searchText,
      withPassive: true
    };
    this.userService.getModUserList(
      params,
      (result: any) => {
        this.data = result;
        this.isLoading = false;
      }
    );
  }

 
  updatePassword(row) {
    Swal.fire({
      title: 'Şifreyi güncelle',
      text: 'Şifreyi boş bırakırsanız otomatik olarak oluşturulur.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
        autoComplate:"off"
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Şifreyi Güncelle',
      cancelButtonText: 'Vazgeç',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        if (!password || password.trim() === '') {
          password = Math.random().toString(36).slice(-6);
        }
        return this.userService.updatePassword({_id: row._id, password})
          .then(result => {
            Swal.fire({
              title: 'Şifre başarıyla güncellendi',
              text: `Yeni şifre: ${password}`
            });
          })
          .catch(error => {
            Swal.fire({
              title: 'Şifre güncellenemedi',
              text: error.message
            });
          });
      }
    });
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
        this.userService.delete('profile', { _id }, result => {
          this.getCustomerList();
          Swal.fire({
            title: 'Kullanıcı Silinmiştir',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
        })

      }
    });
  }
}

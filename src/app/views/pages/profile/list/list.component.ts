import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/service/Page';
import { ProfileService } from 'src/app/service/Profile.Service';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private profileService: ProfileService, private userService: UserService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.pageNumber=1;
  }
  page = new Page;
  data: any = [];
  isLoading = false;
  searchText
  pageNumber;
  search(){
    this.page.pageNumber = 0
    this.isLoading = true;
    this.getPageConfig();
  }


  ngOnInit(): void {
    this.getPageConfig();
  }


  setOnline(id,row){

    this.profileService.setOnline({_id:id,online:!row.online}, result => {
      row.online = !row.online;
    })
  }

  getPageConfig() {
    this.profileService.getProfilePage({ limit: this.page.size, withPassive: true ,key:this.searchText}, (result: any) => {
      this.isLoading = false;
      this.page.totalElements = result.totalElements;
      this.page.totalPages = result.totalPages;
      this.setPage({ offset: 0 });
    });
  }

  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset;
    this.getProfileList();
  }

  setPage2(pageNumber: number) {
    this.setPage({ offset: pageNumber });
  }

  getProfileList() {
    this.isLoading = true;
    let params;

    params = {
      key:this.searchText,
      limit: this.page.size,
      skip: this.page.size * this.page.pageNumber,
      withPassive: true
    };
    this.profileService.getProfileList(
      params,
      (result: any) => {
        this.data = result;
        this.isLoading = false;
      }
    );
  }


  customerToggle(row: any) {
    this.profileService.toogle({ _id: row._id }, (result: any) => {
      row.active = result.active;
    });
  }

  delete(_id) {
    Swal.fire({
      title: 'Silme İşlemini Onaylayın',
      text: "Profile silme işlemini lütfen onaylayın. Aktif görüşmesi olan profilleri silmeyin. Bu işlem geri alınamaz.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete('profile', { _id }, result => {

          Swal.fire({
            title: 'Profile Silinmiştir',
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

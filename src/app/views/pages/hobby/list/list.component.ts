import { Component, OnInit } from '@angular/core';
import { HobbyService } from 'src/app/service/Hobby.Service';
import { Page } from 'src/app/service/Page';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private hobbyService: HobbyService,private userService:UserService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.pageNumber=1;
  }
  page = new Page;
  data: any = [];
  isLoading = false;
  pageNumber;


  ngOnInit(): void {
    this.getPageConfig();
  }

  getPageConfig() {
    this.hobbyService.getHobbyPage({ limit: this.page.size, withPassive: true }, (result: any) => {
      this.isLoading = false;
      this.page.totalElements = result.totalElements;
      this.page.totalPages = result.totalPages;
      this.setPage({ offset: 0 });
    });
  }

  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset;
    this.getHobbyList();
  }
  setPage2(pageNumber: number) {
    this.setPage({ offset: pageNumber });
  }
  getHobbyList() {
    this.isLoading = true;
    let params;

    params = {
      limit: this.page.size,
      skip: this.page.size * this.page.pageNumber,
      withPassive: true
    };
    this.hobbyService.getHobbyList(
      params,
      (result: any) => {
        this.data = result;
        this.isLoading = false;
      }
    );
  }

  customerToggle(row: any) {
    this.hobbyService.toogle({ _id: row._id }, (result: any) => {
      row.active = result.active;
    });
  }
  delete(_id){
    Swal.fire({
      title: 'Silme İşlemini Onaylayın',
      text: "Hobi silme işlemini lütfen onaylayın. Bu işlem geri alınamaz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete('hobby',{_id }, result => {

          Swal.fire({
            title: 'Hobi Silinmiştir',
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

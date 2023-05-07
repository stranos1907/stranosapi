import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/service/Page';
import { SliderService } from 'src/app/service/Slider.Service';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private sliderService: SliderService, private userService: UserService) {
  }

  data: any = [];
  isLoading = false;

  ngOnInit(): void {
    this.getProfileList()
  }

  getProfileList() {
    this.isLoading = true;
    let params;

    params = {
      withPassive: true
    };
    this.sliderService.getJobList(
      params,
      (result: any) => {
        debugger
        this.data = result;
        this.isLoading = false;
      }
    );
  }


  customerToggle(row: any) {
    this.sliderService.toogle({ _id: row._id }, (result: any) => {
      row.active = result.active;
    });
  }

  delete(id) {
    Swal.fire({
      title: 'Durdurma İşlemini Onaylayın',
      text: "Durdurma  işlemini lütfen onaylayın. Bu işlem geri alınamaz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.stopJob( {id }, result => {

          Swal.fire({
            title: 'Oto İşlem Durdurulmuştur',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          this.getProfileList();
        })

      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { SliderService } from 'src/app/service/Slider.Service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  constructor(
    private sliderService: SliderService,  
    private toastr: ToastrService) { }

  job: any = {};
  newSlider: boolean = false;
  image: File;

  ngOnInit(): void {
  }

  async add() {
    this.sliderService.addJob(this.job, result => {
      if (result) {
        this.newSlider = true;
        this.toastr.success("İşlem Ekleme Başarılı")
      }
    })
  }
  
}

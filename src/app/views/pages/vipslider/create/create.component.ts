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
    private fuService: FileUploadService,
    private toastr: ToastrService) { }

  slider: any = {};
  newSlider: boolean = false;
  image: File;

  ngOnInit(): void {
  }

  async add() {

    this.slider.image = await this.uploadImage();
    this.sliderService.addVip(this.slider, result => {
      if (result) {
        this.newSlider = true;
        this.toastr.success("Slider Ekleme Başarılı")
      }
    })

  }
  imageChanged(event) {
    this.image = event.target.files;

  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      this.fuService.upload(this.image, { module: 'image' }, result => {
        if (result?.urls?.length)
          resolve(result.urls[0].url);
        else { reject(null) }
      });
    });

  }

}

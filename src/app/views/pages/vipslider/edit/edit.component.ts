import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { SliderService } from 'src/app/service/Slider.Service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private sliderService: SliderService,
    private fuService: FileUploadService,
    private toastr: ToastrService) { }


  routerId;
  slider: any = {};
  newSlider: boolean = false;
  image: File;

  ngOnInit(): void {
    this.route
      .params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.routerId = params['id'] || 0;
        this.getSlider();
      });
  }

  getSlider() {
    this.sliderService.getVipSlider({ _id: this.routerId }, result => {
      this.slider = result;
    })
  }

  async add() {
    this.newSlider = true;

    if (this.image)
      this.slider.image = await this.uploadImage();
    this.sliderService.updateVip(this.slider, result => {
      if (result) {
        this.toastr.success("Slider Ekleme Başarılı")
        this.newSlider = false;
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

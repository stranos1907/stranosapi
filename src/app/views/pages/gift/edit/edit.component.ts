import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { GiftService } from 'src/app/service/Gift.Service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private giftService: GiftService,
    private fuService: FileUploadService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  gift: any = {};
  newGift: boolean = false;
  image: File;
  routeId;
  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.routeId = x['id'] || 0;
      this.getGift();
    })
  }

  getGift() {
    this.giftService.getGift({ _id: this.routeId }, result => {
      this.gift=result;
    })
  }

  async update() {
    this.newGift = true;
    
    if (this.image) {
      this.gift.image = await this.uploadImage();
    }

    this.giftService.update(this.gift, result => {
      if (result) {
        this.toastr.success("Hediye Güncelleme Başarılı");
        this.getGift();
        this.newGift=false;
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

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { GiftService } from 'src/app/service/Gift.Service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private giftService:GiftService,
    private fuService:FileUploadService,
    private toastr:ToastrService) { }

  gift: any = {  };
  newGift: boolean = false;
  image: File;

  ngOnInit(): void {
  }

  async add() {

    this.gift.image = await this.uploadImage();
    this.giftService.add(this.gift, result => {
      if (result) {
        this.newGift = true;
        this.toastr.success("Hediye Ekleme Başarılı")
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

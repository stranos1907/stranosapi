import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { HobbyService } from 'src/app/service/Hobby.Service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private hobbyService: HobbyService,
    private fuService: FileUploadService,
    private toastr: ToastrService) { }

  hobby: any = {};
  newHobby: boolean = false;
  image: File;

  ngOnInit(): void {
  }

  async add() {

    this.hobby.image = await this.uploadImage();
    this.hobbyService.add(this.hobby, result => {
      if (result) {
        this.newHobby = true;
        this.toastr.success("Hobi Ekleme Başarılı")
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

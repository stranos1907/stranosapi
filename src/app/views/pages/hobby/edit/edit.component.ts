import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { HobbyService } from 'src/app/service/Hobby.Service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private hobbyService: HobbyService,
    private fuService: FileUploadService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  hobby: any = {};
  newHobby: boolean = false;
  image: File;
  routerId;
  ngOnInit(): void {
    this.route
      .params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.routerId = params['id'] || 0;
        this.getHobby();
      });
  }


  getHobby() {
    this.hobbyService.getHobby({ _id: this.routerId }, result => {
      this.hobby = result;
    })
  }

  async add() {
    this.newHobby = true;

    this.hobby.image = await this.uploadImage();
    this.hobbyService.update(this.hobby, result => {
      if (result) {
        this.newHobby = false;
        this.toastr.success("Hobi Güncelleme Başarılı")
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

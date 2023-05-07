import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { HobbyService } from 'src/app/service/Hobby.Service';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private userService: UserService,
    private fileUploadService: FileUploadService,
    private hobbyService:HobbyService,
    private toastr: ToastrService) { }

  user: any = { gender: 1 };
  newUser: boolean = false;
  pp: File;
  gallery: File[];
  minDate;
  birthdayText;
  hobbies:any  = []
  savingPhoto = false
  saving = false;

  ngOnInit(): void {

    this.hobbyService.getHobbyList({limit:100},(data)=>{
      this.hobbies = data.map(x=> {
        return {_id:x._id,name:x.name,image:x.icon ? x.icon:x.image,selected:false}
      });
    })
  }

  async add() {
    if (this.saving || this.savingPhoto) {
      this.toastr.error('Lütfen bekleyin.');
      return
    }

    if (!this.user.name) {
      this.toastr.error('Lütfen isim girin.');
      return;
    }

    if (!this.user.sur_name) {
      this.toastr.error('Lütfen soyisim girin.');
      return;
    }

    if (!this.user.email) {
      this.toastr.error('Lütfen email girin.');
      return;
    }

    if (!this.birthdayText) {
      this.toastr.error('Lütfen doğum tarihi girin.');
      return;
    }

    this.user.fake = false;
    this.user.birthday = new Date(this.birthdayText)
    this.user.age = new Date().getFullYear() - this.user.birthday.getFullYear();
    
    this.saving = false;
    if (this.pp) {
      this.savingPhoto = true;
      this.user.pp = await this.uploadPP();
    }
    
    if (this.gallery) {
      this.savingPhoto = true;
      let images = await this.uploadGallery();
      this.user.images = images
    }

    this.savingPhoto = false;
    this.saving = true;
    

    this.user.hobbies = this.hobbies.filter(x=>x.selected)
    this.userService.add(this.user, result => {
      this.saving = false;
      this.savingPhoto  = false
      
      if (result) {
        this.newUser = true;
        this.toastr.success("Profil Ekleme Başarılı")
      }else{
        this.toastr.error("Profil Ekleme Başarısız")
      }
    })

  }
  sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }
  imageChanged(event) {
    this.pp = event.target.files;

  }

  select(row){
    row.selected = !row.selected;
  }

  galleryChanged(event) {
    this.gallery = event.target.files;
  }

  uploadPP() {
    return new Promise((resolve, reject) => {
      this.fileUploadService.upload(this.pp, { module: 'pp' }, result => {
        if (result?.urls?.length)
          resolve(result.urls[0].url);
        else { reject(null) }
      });
    });

  }
  uploadGallery() {
    return new Promise((resolve, reject) => {
      this.fileUploadService.upload(this.gallery, { module: 'image' }, result => {
        if (result?.urls?.length)
          resolve(result.urls.map(x => x.url))
        else { reject(null) }
      });
    })

  }


}

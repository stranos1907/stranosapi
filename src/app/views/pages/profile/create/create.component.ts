import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { HobbyService } from 'src/app/service/Hobby.Service';
import { ProfileService } from 'src/app/service/Profile.Service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private profileService: ProfileService,
    private hobbyService:HobbyService,
    private fileUploadService: FileUploadService, private toastr: ToastrService) { }

  profile: any = { gender: 1 };
  newProfile: boolean = false;
  pp: File;
  gallery: File[];
  minDate;
  birthdayText;
  savingPhoto = false
  saving = false;
  
  hobbies:any  = []
 
  ngOnInit(): void {

    this.hobbyService.getHobbyList({limit:100},(data)=>{
      this.hobbies = data.map(x=> {
        return {_id:x._id,name:x.name,image:x.icon ? x.icon:x.image,selected:false}
      });
    })
  }

  select(row){
    row.selected = !row.selected;
  }

  async add() {

    if (this.saving || this.savingPhoto) {
      this.toastr.error('Lütfen bekleyin.');
      return
    }

    if (!this.profile.name) {
      this.toastr.error('Lütfen isim girin.');
      return;
    }

    if (!this.profile.sur_name) {
      this.toastr.error('Lütfen soyisim girin.');
      return;
    }

    if (!this.profile.email) {
      this.toastr.error('Lütfen email girin.');
      return;
    }

    if (!this.birthdayText) {
      this.toastr.error('Lütfen doğum tarihi girin.');
      return;
    }

    this.profile.fake = true;
    this.profile.birthday = new Date(this.birthdayText)
    this.profile.age = new Date().getFullYear() - this.profile.birthday.getFullYear();
    
    this.saving = false;
    if (this.pp) {
      this.savingPhoto = true;
      this.profile.pp = await this.uploadPP();
    }
    
    if (this.gallery) {
      this.savingPhoto = true;
      let images = await this.uploadGallery();
      this.profile.images = images
    }

    this.savingPhoto = false;
    this.saving = true;
    
    this.profile.hobbies = this.hobbies.filter(x=>x.selected)
    this.profileService.add(this.profile, result => {
      debugger
      this.saving = false;
      this.savingPhoto = false;
      if (result) {
        this.newProfile = true;
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { HobbyService } from 'src/app/service/Hobby.Service';
import { ProfileService } from 'src/app/service/Profile.Service';
import { UserService } from 'src/app/service/User.Service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    private hobbyService:HobbyService,
    private route: ActivatedRoute
  ) { }

  user: any = {};
  newUser: boolean = false;
  pp: File[];
  gallery: File[];
  minDate;
  birthdayText;
  routerId;
  images
  ready=true;
  hobbies:any  = []

  savingPhoto = false
  saving = false;

  ngOnInit(): void {
    this.route
      .params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.routerId = params['id'] || 0;
        this.getUserFromId();
      });

      
  }

  getUserFromId() {
    this.profileService.getProfile({ _id: this.routerId }, result => {
      this.user = result;
      this.user.password = null
      this.hobbyService.getHobbyList({limit:100},(data)=>{
        debugger
        this.hobbies = data.map(x=> {
          return {_id:x._id,name:x.name,image:x.icon ? x.icon:x.image,selected:false}
        });
        let userHobbies = this.user.hobbies 
        this.hobbies?.forEach(hobby => {
          userHobbies?.forEach(userHobby => {
            if(hobby._id == userHobby._id){
              hobby.selected = true
            }
          });
        })
      })

      

    })
  }

  async update() {

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
    


    this.ready = false;
    this.user.birthday = new Date(this.birthdayText)
    this.user.age = new Date().getFullYear() - this.user.birthday.getFullYear();
    
    this.saving = false;
    if (this.pp) {
      this.savingPhoto = true;
      this.user.pp = await this.uploadPP();
    }
    
    if (this.gallery) {
      this.savingPhoto = true;
      let galleryUrl = await this.uploadGallery();
      this.user.images = this.user.images.concat(galleryUrl);
    }

    this.savingPhoto = false;
    this.saving = true;


    this.user.hobbies = this.hobbies.filter(x=>x.selected)
    this.profileService.update(this.user, result => {
      this.saving = false;
        this.savingPhoto = false;
      if (result) {
        this.newUser = true;
        this.toastr.success("Profil Güncelleme Başarılı")
        this.getUserFromId();
        this.ready = true;
      }else{
        this.ready = true;
        this.toastr.error("Profil Güncelleme Başarısız")
      }


    })

  }

  select(row){
    row.selected = !row.selected;
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

  removeGallery(url) {
    this.user.images = this.user.images.filter(x => x != url);
  }
  imageChanged(event) {
    this.pp = event.target.files;

  }

  galleryChanged(event) {

    this.gallery = event.target.files;
  }
}

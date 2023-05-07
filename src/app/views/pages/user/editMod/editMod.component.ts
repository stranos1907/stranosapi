import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { HobbyService } from 'src/app/service/Hobby.Service';
import { ProfileService } from 'src/app/service/Profile.Service';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editMod',
  templateUrl: './editMod.component.html',
  styleUrls: ['./editMod.component.scss']
})
export class EditModComponent implements OnInit {

  constructor(private userService: UserService,
    private router:Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private toastr: ToastrService) { }

  user: any = { gender: 1 };
  routerId;
  
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
    })
  }



  async add() {

    if (!this.user.name) {
      this.toastr.error('Lütfen isim girin.');
      return;
    }

    if (!this.user.email) {
      this.toastr.error('Lütfen email girin.');
      return;
    }

    this.user.fake = false;
    this.user.mod = true
    this.user.admin = false

    let body = {
      _id:this.user._id,
      name:this.user.name,
      email:this.user.email,
      password:this.user.password
    }
    
    this.userService.updateMod(body, result => {
      if (result) {
        this.toastr.success("Mod Güncelleme Başarılı")
        this.router.navigate(['/user/mods'])
      }else{
        this.toastr.error("Mod Güncelleme Başarısız")
      }
    })

  }
  sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

}

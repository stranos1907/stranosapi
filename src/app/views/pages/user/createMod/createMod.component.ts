import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { HobbyService } from 'src/app/service/Hobby.Service';
import { UserService } from 'src/app/service/User.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createMod',
  templateUrl: './createMod.component.html',
  styleUrls: ['./createMod.component.scss']
})
export class CreateModComponent implements OnInit {

  constructor(private userService: UserService,
    private router:Router,
    private toastr: ToastrService) { }

  user: any = { gender: 1 };
  
  ngOnInit(): void {
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

    if (!this.user.password) {
      this.toastr.error('Lütfen şifre girin.');
      return;
    }

    this.user.fake = false;
    this.user.mod = true
    this.user.admin = false
    
    this.userService.addMod(this.user, result => {
      if (result) {
        this.toastr.success("Mod Ekleme Başarılı")
        this.router.navigate(['/user/mods'])
      }else{
        this.toastr.error("Mod Ekleme Başarısız")
      }
    })

  }
  sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

}

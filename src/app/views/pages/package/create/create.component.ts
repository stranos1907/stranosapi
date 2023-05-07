import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import { PackageService } from 'src/app/service/Package.Service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private packageService:PackageService,
    private toastr:ToastrService
  ) { }

  package:any ={};
  newPackage:boolean=false;

  ngOnInit(): void {
  }

  add() {


    this.packageService.add(this.package, result => {
      if (!result.message) {
        this.newPackage = true;
        this.toastr.success("Paket Ekleme Başarılı")
      }else{
        this.toastr.warning(result.message)
      }
    })

  }
}

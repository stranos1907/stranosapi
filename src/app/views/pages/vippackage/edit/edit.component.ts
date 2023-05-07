import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from 'src/app/service/Package.Service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private packageService: PackageService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  package: any = {};
  newPackage: boolean = false;
  routerId;

  ngOnInit(): void {
    this.route
      .params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.routerId = params['id'] || 0;
        this.getPackage();
      });
  }


  update() {

    this.newPackage = true;
    this.package.vip = true;

    this.packageService.update(this.package, result => {
      if (result) {
        this.toastr.success("Paket Güncelleme Başarılı");
        this.newPackage = false;
      }
    })

  }

  getPackage() {
    this.packageService.getPackage({ _id: this.routerId }, result => {
      this.package = result;
    })
  }
}

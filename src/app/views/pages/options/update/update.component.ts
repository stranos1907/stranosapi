import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/User.Service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private userService: UserService,private toastrService:ToastrService) { }

  options: any = {};
  
  ngOnInit(): void {
    this.getOptions()
  }
  getTopicList() {

  }
  getOptions() {
    this.userService.getOptions({}, result => {
      debugger
      this.options = result
    })
  }

  send() {
    this.userService.updateOptions(this.options, result => {
      this.toastrService.success("Bildirim Gönderildi")
    })
  }

}

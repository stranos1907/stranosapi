import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/User.Service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  constructor(private userService: UserService,private toastrService:ToastrService) { }

  users: any[] = [];
  userList: any[] = [];

  topics: any[];
  topicList: any[];

  notification: any = {};
  checkAll = false;

  ngOnInit(): void {
    this.getUserList();
    this.getTopicList();
  }
  getTopicList() {

  }
  getUserList() {
    this.userService.getUserList({ limit: 1000 }, result => {
      this.userList = result;
      this.userList.unshift({ _id: 'all', name: 'Herkese Gönder' })
    })
  }

  selectAll() {
    this.users = this.userList.map(x => x._id);
  }

  unselectAll() {
    this.users = [];
  }

  send() {
    this.userService.sendNotif(this.notification, result => {

this.toastrService.success("Bildirim Gönderildi")
    })
  }
}

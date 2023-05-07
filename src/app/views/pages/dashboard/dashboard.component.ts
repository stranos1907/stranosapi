import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/service/Message.Service';
import { UserService } from 'src/app/service/User.Service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit,OnDestroy {


  users: any[] = [];
  lastUsers: any[] = [];
  dialogs: any[] = [];

  usersCount
  profileCount
  onlineCount
  saleCount

  admin

  constructor(private userService: UserService,
    public socket: Socket,
    private toastr: ToastrService,
    private messageService: MessageService,private router:Router) { }
  ngOnDestroy(): void {
    this.socket.disconnect()
    this.socket.ioSocket.close()
  }

  ngOnInit(): void {
    this.getUsers();

    let token = localStorage.getItem("token")
        if(token){
          const user = new JwtHelperService().decodeToken(token);
          this.admin = user.admin
        }
    
    this.socket.connect()
    this.socket.on('connect', (data) => {
      this.socket.on("dialog/new-message", (data)=>{
        this.toastr.success("Bir Yeni Mesaj Geldi")
      })
      let token = localStorage.getItem("token")
      if(token){
        const user = new JwtHelperService().decodeToken(token);
        this.socket.emit("subscribe/admin",{_id:user._id})
      }
    })
    this.getDialogs()
  }

  sendMessage(row){
    this.router.navigate(['/apps/chat'],{ queryParams: { dialogId: row._id } });
  }

  sendMessageTo(row) {
    this.router.navigate(['/user/send'], { queryParams: { userId: row._id } });
  }


  getUsers() {
    this.userService.getUserList({ limit: 10 ,online:true}, result => {
      this.users = result;
    })
    this.userService.getLastUsers({ limit: 10}, result => {
      debugger
      this.lastUsers = result;
    })
  }

  isVip(row){
    let start = new Date(row.vipStart)
    let end = new Date(row.vipEnd)
    let now = new Date()
    if (start <= now && end >= now) {
      return true
    }
    return false
  }

  getDialogs() {
  

    this.userService.getHome({},result=>{
      if (result) {
        this.usersCount = result.usersCount
        this.profileCount = result.profileCount
        this.onlineCount = result.onlineCount
        this.saleCount = result.saleCount        

        //decode token 
      }
    })
  }


}










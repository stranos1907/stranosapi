import { Component, OnInit } from '@angular/core';
import { OneSignal } from 'onesignal-ngx';
import { environment } from 'src/environments/environment';
import { UserService } from './service/User.Service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nobleui-angular';

  constructor(private oneSignal: OneSignal,private userService:UserService) {
  }


  ngOnInit(): void {

    this.oneSignal.init({
      appId: environment.ONE_SIGNAL_ID,
      autoRegister:true,
  });
  this.oneSignal.isPushNotificationsEnabled(enabled=>{
    this.oneSignal.getUserId().then((userId) => {
      this.userService.updateToken({token:userId},(result:any)=>{
        console.log(userId);
      });
    })
    })
    }

  }

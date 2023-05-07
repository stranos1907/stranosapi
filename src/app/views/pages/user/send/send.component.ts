import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/service/Message.Service';
import { ProfileService } from 'src/app/service/Profile.Service';
import { UserService } from 'src/app/service/User.Service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  constructor(private userService: ProfileService,private toastr: ToastrService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router:Router 
    ) { }

  userList: any[] = [];

  topics: any[];
  topicList: any[];

  profile
  desc
  messageText;
  id

  ngOnInit(): void {
    
    this.route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this.getUserList();
      });
  }

  getUserList() {
    this.userService.availableUsers({ _id:this.id,limit: 1000 }, result => {
      this.userList = result;
    })
  }

  newMessage(toChat) {

    let user1 = this.profile
    let user2 = this.id

    var sender = user1
    var receiver = user2
    
    let message = {
      _id:null,
      message: this.messageText,
      sender: sender,
      receiver: receiver,
      createdAt:Date()
    }
    this.messageService.sendMessage({ dialog: null, message: message }, result => {
      if (result) {
        this.toastr.success("Mesaj Gönderildi")
        if (toChat) {
          const link = document.createElement('a');
          link.setAttribute('href', environment.BASE_URL3 + "#/message/chat/" + result.dialog);
          link.setAttribute('rel', 'noopener noreferrer');
          link.click();
        }
      }
    })
    return false;
  }
}

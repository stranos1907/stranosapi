import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Socket } from 'ngx-socket-io';
import { MessageService } from 'src/app/service/Message.Service';
import { UserService } from 'src/app/service/User.Service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/FileUpload.Service';
import Swal from 'sweetalert2';
import { HostListener } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ChatService } from 'src/app/service/ChatService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('psBottom') psBottom: PerfectScrollbarDirective;
  @ViewChild('chatInput') chatInput: ElementRef;


  constructor(private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public socket: Socket,
    private messageService: MessageService,
    private router:Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private locationStrategy: LocationStrategy,
    private userService: UserService,
    private chatService:ChatService
    ) {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.chatInput.nativeElement.focus();
    },1000)

  }

  isLoading = false

  dialogs: any[] = [];
  originalDialogs: any[] = [];
  messages: any[] = [];
  
  searchText
  selectedDialog: any;
  messageText;
  

  dialogId
  setupForNew = false
  selectedProfile
  newDialog
  pp: File;
  systemMessage = false

  defaultNavActiveId = 1;

  user1
  user2

  ngOnInit(): void {
    this.route
    .params
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      debugger
      this.dialogId = params['id'] || null;
      this.getDialog(this.dialogId)
    });

    this.chatService.subscribeToNewMessage((data)=>{
      debugger
      let dialog = data.dialog
      let message = data.message
    
      if (dialog?.toString() == this.dialogId) {
        this.messages.push(message)
        setTimeout(() => {
          
          this.psBottom.scrollToBottom(0, 0);
        }, 10);
      }

    })



  }




  getDialog(id){
    this.messageService.dialog({_id:id},(result)=>{
      if (result && result.length > 0) {
        this.selectDialog(result[0])
      }
    })
  }

  dialogSelect() {

    if (!this.selectedDialog) {
      this.selectDialog(this.originalDialogs[0])
    }

  }

  banUser(row) {

    var title = ""
    var text = ""
    if (row.banned) {
      title = "Kullanıcı engelini Kaldır"
      text = "Kullanıcı engelini kaldırmak istediğinize emin misiniz? Kullanıcı tekrar sisteme giriş yapabilir."
    } else {
      title = "Kullanıcıyı Engelle"
      text = "Engellenen kullanıcı uygulamayı bu hesapla bir daha kullanamaz işlem geri alınabilir."
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.toggleBan({ _id: row._id }, result => {
          Swal.fire({
            title: 'İşlem Tamamlandı',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          //this.router.navigate(['/message/list']);
        })
      }
    });
  }


  selectDialog(item) {
    this.selectedDialog = item;

    if(item.user1?.fake){
      this.user2 = item.user1
      this.user1 = item.user2
    }else{
      this.user2 = item.user2
      this.user1 = item.user1
    }


    this.messages = [];
    this.messageService.getMessageList({ dialog: this.selectedDialog._id }, result => {
      this.messages = result.sort((b, a) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      if (item.unReadCount > 0) {

        var willRead = [String]
        for (let i = 0; i < this.messages.length; i++) {
          const element = this.messages[i];
          if (element.receiver.fake) {
            willRead.push(element._id)
            this.messages[i].read = true
          }
        }
        if (willRead) {
          for (let i = 0; i < willRead.length; i++) {
            const element = willRead[i];
            this.socket.emit("dialog/read", { _id: element })
            this.dialogs.find(x => x._id == this.selectedDialog._id).unReadCount = 0

          }
        }
      }
      setTimeout(() => {
        this.psBottom.scrollToBottom(0, 0);
      }, 10);
    })
  }

  async imageChanged(event) {
    this.pp = event.target.files;
    let url = await this.uploadImage()
    if (url) {
      this.newMessageWithImage(url)
    }
  }

  uploadImage() {
    return new Promise((resolve, reject) => {


      this.fileUploadService.upload(this.pp, { module: 'pp' }, result => {
        if (result?.urls?.length)
          resolve(result.urls[0].url);
        else { reject(null) }
      });
    });
  }

  deleteMessage(message) {
    Swal.fire({
      title: 'Silme İşlemi Onaylayın',
      text: "Mesaj silinecektir. Bu işlem geri alınamaz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete('message', { _id: message?._id }, result => {
          Swal.fire({
            title: 'Mesaj Silinmiştir',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          this.selectDialog(this.selectedDialog)
          this.selectDialog(this.selectedDialog)
        })
      }
    });
  }

  newMessage() {

    let user1 = this.selectedDialog.user1
    let user2 = this.selectedDialog.user2

    var sender = null
    var receiver = null
    if (user1.fake) {
      sender = user1
      receiver = user2
    } else {
      sender = user2
      receiver = user1
    }
    let message = {
      _id: null,
      message: this.messageText,
      dialog: this.selectedDialog._id,
      sender: sender,
      receiver: receiver,
      createdAt: Date(),
      systemMessage : this.systemMessage
    }
    this.messageService.sendMessage({ dialog: this.selectedDialog._id, message: this.messageText, systemMessage:this.systemMessage }, result => {
      message._id = result._id
      this.messages.push(message)
      this.messageText = ""
      setTimeout(() => {
        this.psBottom.scrollToBottom(0, 500);
      }, 100);
    })
    return false;
  }

  newCoinMessage() {
    let user1 = this.selectedDialog.user1
    let user2 = this.selectedDialog.user2

    var sender = null
    var receiver = null
    if (user1.fake) {
      sender = user1
      receiver = user2
    } else {
      sender = user2
      receiver = user1
    }
    let message = {
      _id: null,
      message: "Konuştuğunuz kişinin jetonu bitti. Jeton hediye etmek ister misiniz?",
      dialog: this.selectedDialog._id,
      sender: sender,
      receiver: receiver,
      createdAt: Date(),
      coinMessage: true
    }
    this.messageService.sendMessage({ dialog: this.selectedDialog._id, message: "Konuştuğunuz kişinin jetonu bitti. Jeton hediye etmek ister misiniz?", coinMessage:true }, result => {
      message._id = result._id
      this.messages.push(message)
      this.messageText = ""
      setTimeout(() => {
        this.psBottom.scrollToBottom(0, 500);
      }, 100);
    })
    return false;
  }

  sendVipMessage() {
    let user1 = this.selectedDialog.user1
    let user2 = this.selectedDialog.user2

    var sender = null
    var receiver = null
    if (user1.fake) {
      sender = user1
      receiver = user2
    } else {
      sender = user2
      receiver = user1
    }
    let message = {
      _id: null,
      message: "Telefon/İnstagram mesajı göndermek için lütfen VİP üye olun",
      dialog: this.selectedDialog._id,
      sender: sender,
      receiver: receiver,
      createdAt: Date(),
      systemMessage: true
    }
    this.messageService.sendMessage({ dialog: this.selectedDialog._id, message: "Telefon/İnstagram mesajı göndermek için lütfen VİP üye olun", systemMessage:true }, result => {
      message._id = result._id
      this.messages.push(message)
      this.messageText = ""
      setTimeout(() => {
        this.psBottom.scrollToBottom(0, 500);
      }, 100);
    })
    return false;
  }

  sendNudeMessage() {
    let user1 = this.selectedDialog.user1
    let user2 = this.selectedDialog.user2

    var sender = null
    var receiver = null
    if (user1.fake) {
      sender = user1
      receiver = user2
    } else {
      sender = user2
      receiver = user1
    }
    let message = {
      _id: null,
      message: "Uygunsuz resim/içerik gönderimi yasaktır. Lütfen kurallara uyalım. Kurallara uymadığınız takdirde hesabınız kapanabilir.",
      dialog: this.selectedDialog._id,
      sender: sender,
      receiver: receiver,
      createdAt: Date(),
      systemMessage: true
    }
    this.messageService.sendMessage({ dialog: this.selectedDialog._id, message: "Uygunsuz resim/içerik gönderimi yasaktır. Lütfen kurallara uyalım. Kurallara uymadığınız takdirde hesabınız kapanabilir.", systemMessage:true }, result => {
      message._id = result._id
      this.messages.push(message)
      this.messageText = ""
      setTimeout(() => {
        this.psBottom.scrollToBottom(0, 500);
      }, 100);
    })
    return false;
  }

  addEmoji(emoji) {
    // const input = document.getElementById('emoji-input');
    // const emoji = '&#x1F600;';
    if (this.messageText) {
      this.messageText += emoji
    }else{
      this.messageText = emoji
    }    
  }

  newMessageWithImage(url) {

    let user1 = this.selectedDialog.user1
    let user2 = this.selectedDialog.user2

    var sender = null
    var receiver = null
    if (user1.fake) {
      sender = user1
      receiver = user2
    } else {
      sender = user2
      receiver = user1
    }
    let message = {
      _id: null,
      message: "Resim",
      dialog: this.selectedDialog._id,
      sender: sender,
      image: url,
      receiver: receiver,
      createdAt: Date()
    }
    this.messageService.sendMessage({ dialog: this.selectedDialog._id, message: "Resim", image: url }, result => {
      message._id = result._id
      this.messages.push(message)
      this.messageText = ""
      setTimeout(() => {
        this.psBottom.scrollToBottom(0, 500);
      }, 100);
    })
    return false;
  }

  deleteDialog() {
    Swal.fire({
      title: 'Silme İşlemi Onaylayın',
      text: "Bu görüşme ve mesajlar silinecektir. Bu işlem geri alınamaz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete('dialog', { _id: this.selectedDialog?._id }, result => {
          this.selectedDialog = null
          this.selectDialog(this.selectedDialog)
          Swal.fire({
            title: 'Görüşme Silinmiştir',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
        })
      }
    });
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
 
  delete(row){
    
  }

}

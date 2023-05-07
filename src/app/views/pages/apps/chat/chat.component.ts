import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  defaultNavActiveId = 1;

  @ViewChild('psBottom') psBottom: PerfectScrollbarDirective;

  systemMessage = false
  constructor(private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public socket: Socket,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private locationStrategy: LocationStrategy,
    private userService: UserService) {
    this.preventBackButton();
  }


  preventBackButton() {
    history.pushState(null, location.href, location.href);
    this.locationStrategy.onPopState(() => {
      if (this.selectedDialog) {
        history.pushState(null, location.href, location.href);
        this.backToChatList()
        this.selectedDialog = null
      }
    })
  }


  ngOnDestroy(): void {
    this.selectedDialog = null
    this.socket.disconnect()
    this.socket.ioSocket.close()
  }




  dialogs: any[] = [];
  originalDialogs: any[] = [];
  userDialogs: any[] = [];
  userOriginalDialogs: any[] = [];
  messages: any[] = [];
  searchText;
  
  selectedDialog: any;
  messageText;
  
  userId
  dialogId
  setupForNew = false
  selectedProfile
  profiles
  selectedUser
  newDialog
  pp: File;

  ngOnInit(): void {

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.userId = params['userId'] || null;
        this.dialogId = params['dialogId'] || null;
      });

    this.getDialogs();

    this.socket.connect()
    this.socket.on('connect', (data) => {
      this.socket.on("dialog/new-message", (data) => {
        let dialog = this.dialogs.find(x => x._id == data.dialog)
        if (dialog) {
          if (dialog._id == this.selectedDialog?._id) {
            this.messages.push(data.message)
            setTimeout(() => {
              this.psBottom?.scrollToBottom(0, 500);
            }, 10);
          } else {
            if (dialog.unReadCount == null) {
              dialog.unReadCount = 0
            }
            dialog.unReadCount++
            dialog.lastMessage = data.message
            this.sortDialogs()
            this.toastr.success("Bir Yeni Mesaj Geldi")
            this.makeClick();
          }
          setTimeout(() => {
            this.psBottom.scrollToBottom(0, 500);
          }, 100);

        } else {
          this.toastr.success("Bir Yeni Mesaj Geldi")
          this.getDialogs();
        }
      })
      this.makeClick();
      let token = localStorage.getItem("token")
      if (token) {
        const user = new JwtHelperService().decodeToken(token);
        this.socket.emit("subscribe/admin", { _id: user._id })
      }
    })




  }
  // back to chat-list for tablet and mobile devices
  ngAfterViewInit(): void {

    setTimeout(()=>this.makeClick(), 1)


  } 
  makeClick() {

    // Show chat-content when clicking on chat-item for tablet and mobile devices
    document.querySelectorAll('.chat-list .chat-item').forEach(item => {
      item.addEventListener('click', event => {

        document.querySelector('.chat-content')!.classList.toggle('show');
      })
    });

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
          this.getDialogs()
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
          this.getDialogs()
        })
      }
    });
  }


  sortDialogs() {
    this.dialogs = this.dialogs.sort((a, b) => {
      return a > b ? -1 : 1;
    })

  }

  sortedDialogs() {
    this.dialogs = this.dialogs.sort((a, b) => {
      return a > b ? -1 : 1;
    })
    return this.dialogs
  }

  newDialogSelect() {
    let dialog = {
      _id: "new",
      user1: {
        _id: this.userId,
        name: this.selectedUser.name,
        pp: this.selectedUser.pp,
      },
      user2: {
        _id: this.selectedProfile?._id,
        name: this.selectedProfile?.name,
        pp: this.selectedProfile?.pp,
      }
    }
    this.newDialog = dialog
    this.dialogs.push(dialog)

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

  getDialogs() {
    this.messageService.dialogs({ fake: true }, result => {
      this.originalDialogs = result;
      

      this.searchMessages()
      if (this.userId) {
        let dialog = this.dialogs.find(x => x.user2?._id == this.userId || x.user1?._id == this.userId)
        this.sortDialogs()
        if (dialog) {
          this.selectDialog(dialog)
        } else {
          //this.dialogSelect()
        }
      } else if (this.dialogId) {
        let dialog = this.dialogs.find(x => x._id == this.dialogId)
        if (dialog) {
          this.selectDialog(dialog)
        } else {
          //this.dialogSelect()
        }
      } else {
        //this.dialogSelect()
      }
      this.sortDialogs()
    })
  }
  getUserDialogs() {
    this.messageService.dialogs({ fake: false }, result => {
      this.userOriginalDialogs = result;
      this.searchUserMessages()
      this.dialogSelect()
  
    })
  }
  dialogSelect() {

    if (!this.selectedDialog) {
      this.selectDialog(this.originalDialogs[0])
    }

  }
  searchMessages() {
    if (this.searchText) {
      this.dialogs = this.originalDialogs.filter(x => {
        return (x?.user1?.name?.toLowerCase().includes(this.searchText.toLowerCase())) ||
          (x?.user2?.name?.toLowerCase().includes(this.searchText.toLowerCase()));
      })
    } else { this.dialogs = this.originalDialogs; }

    setTimeout(() => this.makeClick(), 1)
  }

  searchUserMessages() {

    if (this.searchText) {
      this.userDialogs = this.userOriginalDialogs.filter(x => {
        return (x?.user1?.name?.toLowerCase().includes(this.searchText.toLowerCase())) ||
          (x?.user2?.name?.toLowerCase().includes(this.searchText.toLowerCase()));
      })
    } else { this.userDialogs = this.userOriginalDialogs; }
    setTimeout(() => this.makeClick(), 1)

  }

  selectDialog(item) {
    this.selectedDialog = item;
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
        this.psBottom.scrollToBottom(0, 500);
      }, 10);
    })
  }

  // back to chat-list for tablet and mobile devices
  backToChatList() {
    document.querySelector('.chat-content')!.classList.toggle('show');
  }

  save() {
    console.log('passs');

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


}

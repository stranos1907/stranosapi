import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
import { environment } from 'src/environments/environment';
import { Page } from 'src/app/service/Page';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public socket: Socket,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private chatService:ChatService,
    private cdRef: ChangeDetectorRef,
   private router: Router,
    private locationStrategy: LocationStrategy,
    private userService: UserService) {
      this.page.pageNumber = 0;
      this.pageNumber = 1;
      this.page.size = 50;
    }
    page = new Page;
    pageNumber

  isLoading = false

  dialogs: any[] = [];
  originalDialogs: any[] = [];
  searchText

  ngOnInit(): void {
    this.getPageConfig();

    this.chatService.subscribeToNewMessage((data)=>{
      debugger
      let dialog = data.dialog
      let message = data.message
    
      //find old dialogs, if found change last message else getDialogs()
      this.getPageConfig()
    })

    //start timer evert 1 min refresh page
    setInterval(() => {
      this.getPageConfig()
    }, 30000);
  }

  getPageConfig() {
    this.userService.getDialogPage({ key: this.searchText, limit: this.page.size, withPassive: true }, (result: any) => {
      this.isLoading = false;
      this.page.totalElements = result.totalElements;
      this.page.totalPages = result.totalPages;
      this.setPage({ offset: 0 });
    });
  }

  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset;
    this.getDialogs();
  }

  setPage2(pageNumber: number) {
    this.setPage({ offset: pageNumber });
  }

  getLink(row) {
    //${environment.BASE_URL3}/#/message/chat/${row._id}
    return environment.BASE_URL3 + "#/message/chat/" + row._id;
  }

  openInNewTab(row): void {
    const link = document.createElement('a');
    link.setAttribute('href', environment.BASE_URL3 + "#/message/chat/" + row._id);
    link.click();
  }
 
  compareByCreatedAt(a, b) {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  }

  getDialogs() {
    let params ={
      fake: true,
      limit: this.page.size,
      skip: this.page.size * this.page.pageNumber,
    }

    this.messageService.dialogs(params, result => {
      this.originalDialogs = result;
      this.dialogs = result
    })
  }

  search(){
    if (this.searchText) {
      this.dialogs = this.originalDialogs.filter(x => {
        return (x?.user1?.name?.toLowerCase().includes(this.searchText.toLowerCase())) ||
          (x?.user2?.name?.toLowerCase().includes(this.searchText.toLowerCase()));
      })
    } else { this.dialogs = this.originalDialogs; }
  }

  delete(row){
    debugger
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
        this.userService.delete('dialog', { _id: row?._id }, result => {
          this.getDialogs()
        })
      }
    });
  }

}

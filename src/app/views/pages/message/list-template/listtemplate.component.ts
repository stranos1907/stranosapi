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
  selector: 'app-listtemplate',
  templateUrl: './listtemplate.component.html',
  styleUrls: ['./listtemplate.component.scss']
})
export class ListTemplateComponent implements OnInit {

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
      this.page.size = 10;
    }
    page = new Page;
    pageNumber

  isLoading = false

  dialogs: any[] = [];
  originalDialogs: any[] = [];
  searchText

  ngOnInit(): void {
    this.getPageConfig();
  }

  getPageConfig() {
    this.messageService.getTemplatesPage({ key: this.searchText, limit: this.page.size, withPassive: true }, (result: any) => {
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

  openInNewTab(row): void {
    const link = document.createElement('a');
    link.setAttribute('href', environment.BASE_URL3 + "#/message/chat/" + row._id);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
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

    this.messageService.templates(params, result => {
      this.originalDialogs = result;
      this.dialogs = result
      // for (let i = 0; i < this.dialogs.length; i++) {
      //   const element = this.dialogs[i];
      //   if (i == 0) {
      //     element.message = "selam"
      //   }else{
      //     element.message = "Noldu cevap vermedin"
      //   }
      // }
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

  sendToLast(row){
    this.messageService.sendToLasts({text:row.message}, result => {
      this.toastr.success("Mesaj başarıyla gönderilmiştir");
    })
  }

  sendToLastFake(row){
    this.messageService.replyMessages({text:row.message}, result => {
      this.toastr.success("Mesaj başarıyla gönderilmiştir");
    })
  }

  delete(_id) {
    Swal.fire({
      title: 'Silme İşlemini Onaylayın',
      text: "Silme işlemini lütfen onaylayın. Bu işlem geri alınamaz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'İşlemi Onayla',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete('template', { _id }, result => {

          Swal.fire({
            title: 'Mesaj Silinmiştir',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          this.setPage({ offset: this.page.pageNumber });
        })

      }
    });
  }

}

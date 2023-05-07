import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { GlobalVariable } from '../core/Global';

@Injectable({
  providedIn: 'root',

})

export class MessageService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  dialogs(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/dialogs', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

   templates(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/templates', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  dialog(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/dialog', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }
  getMessage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/messages/get', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }
  getFilterList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/messages/filter-list', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }
  getMessageList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/messages', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    }
    );
  }


  getEdit(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/messages/edit-get', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }
  getMessagePage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/messages-page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  getTemplatesPage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/templates-page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  sendMessage(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/new-message', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }


  sendToLasts(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/send-tolast', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }
  replyMessages(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/reply-messages', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  update(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/messages/update', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }


  toogle(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/messages/toggle/active', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { GlobalVariable } from '../core/Global';

@Injectable({
  providedIn: 'root',

})

export class ProfileService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }


  getProfile(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/get-profile', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }
  getFilterList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/profiles/filter-list', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }
  getProfileList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/profiles', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }
  availableUsers(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/available-users', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }


  getEdit(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/profiles/edit-get', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }
  getProfilePage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/profiles-page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }

  add(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/add-profile', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {
      callback(result);
    }, err => {
      callback(null)
      new GlobalVariable().checkError(err,this.toastr);
    });
  }


  update(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/update-profile', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      callback(null)
      new GlobalVariable().checkError(err,this.toastr);
    });
  }

  setOnline(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/set-online', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }

  toogle(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/profiles/toggle/active', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }
}

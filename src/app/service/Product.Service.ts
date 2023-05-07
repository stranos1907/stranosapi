import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { GlobalVariable } from '../core/Global';

@Injectable({
  providedIn: 'root',

})

export class ProductService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }


  getProduct(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/product/get', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }
  getProductList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/product/list', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }

  filterList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/product/filter-list', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }

  getProductPage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/product/page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }

  add(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/product/add', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }

  update(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/product/update', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }


  toogle(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/product/toggle/active', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }
}

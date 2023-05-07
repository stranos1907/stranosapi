import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { GlobalVariable } from '../core/Global';

@Injectable({
  providedIn: 'root',

})

export class SliderService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }


  getSlider(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/get-slider', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  getVipSlider(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/get-vip-slider', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  getTemplate(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/get-template', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }


  getFilterList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/sliders/filter-list', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  getEdit(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/sliders/edit-get', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }



  getSliderList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/sliders', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    }
    );
  }

  getJobList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/jobs/list', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    }
    );
  }
  
  getSliderPage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/sliders-page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  getVipSliderList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/vip-sliders', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    }
    );
  }
  
  getVipSliderPage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/vip-sliders-page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });

  }

  add(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/add-slider', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  addJob(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/jobs/create', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  addTemplate(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/add-template', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  update(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/update-slider', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  updateTemplate(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/update-template', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  addVip(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/add-vip-slider', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  updateVip(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/update-vip-slider', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  toogle(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/sliders/toggle/active', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }
}

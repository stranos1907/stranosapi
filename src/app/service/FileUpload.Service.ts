import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { GlobalVariable } from '../core/Global';

@Injectable({
  providedIn: 'root',

})

export class FileUploadService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }



  upload(files, body, callback) {
    const formData = new FormData();
    debugger
    // Store form name as "file" with file data
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      formData.append("files"+i, element, element.name);
    }

    formData.append("module", body.module);
    this.http.post<any>(environment.BASE_URL + '/images/upload', formData, {
      headers:
        {  'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }

  update(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/images/update', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err, this.toastr);
    });
  }



}

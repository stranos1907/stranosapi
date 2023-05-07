import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',

})

export class AuthService {
  constructor(private http: HttpClient) { }
  login(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
    this.http.post<any>(environment.BASE_URL + '/login', params, {
      headers
    }).subscribe(result => {
      callback(result, null);
    }, err => {
      callback(err);
    });
  }

}

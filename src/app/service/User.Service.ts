import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { GlobalVariable } from '../core/Global';

@Injectable({
  providedIn: 'root',

})

export class UserService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }


  getUser(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/get-profile', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }

  getHome(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/home', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }

  addCoins(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/add-coins', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }


  stopJob(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/jobs/stop', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }

  updatePassword(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put<any>(environment.BASE_URL + '/update-password', body, {
        headers:
          { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      }).subscribe(result => {
        resolve(result);
      }, err => {
        new GlobalVariable().checkError(err, this.toastr);
        reject(err);
      });
    });
  }
  

  updateMod(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/update-mod', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }


  updateToken(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/update-token', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }

  toggleBan(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/toggle-ban', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }


  getFilterList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/users/filter-list', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }
  getLastUsers(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/last-users', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }

  getOptions(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/options', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }
  
  getVipUserList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/vip-users', {
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
    this.http.get<any>(environment.BASE_URL + '/users/edit-get', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }



  delete(module,params, callback) {
    debugger
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.delete<any>(environment.BASE_URL + '/delete-'+module, {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      callback(null)
      new GlobalVariable().checkError(err,this.toastr);
    });

  }

  


  getUserPage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/users-page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }

  getDialogPage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/dialogs-page', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });

  }

  getUserList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/users', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }

  getModUserList(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/mod-users', {
      headers, params
    }).subscribe(result => {
      callback(result);

    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    }
    );
  }

  getVipUserPage(params, callback) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' };
    this.http.get<any>(environment.BASE_URL + '/vip-users-page', {
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

  addMod(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/add-mod', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {
      callback(result);
    }, err => {
      callback(null)
      new GlobalVariable().checkError(err,this.toastr);
    });
  }


  sendNotif(body, callback) {
    this.http.post<any>(environment.BASE_URL + '/send-notif', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      callback(null)
      new GlobalVariable().checkError(err,this.toastr);
    });
  }

  updateOptions(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/update-options', body, {
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
    this.http.put<any>(environment.BASE_URL + '/users/update', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      callback(null)
      new GlobalVariable().checkError(err,this.toastr);
    });
  }




  toogle(body, callback) {
    this.http.put<any>(environment.BASE_URL + '/users/toggle/active', body, {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(result => {

      callback(result);
    }, err => {
      new GlobalVariable().checkError(err,this.toastr);
    });
  }
}

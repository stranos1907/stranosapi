import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/Auth.Service';
import { UserService } from 'src/app/service/User.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
  username;
  password;
  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    debugger
    let body = {
      username: this.username,
      password: this.password
    }
    this.authService.login(body, result => {
      if (result?.error) {
        this.toastr.error(result?.message)
      }
      else {
        localStorage.setItem('token', result.token);
        this.router.navigate([this.returnUrl]);
      }

    })

  }

}

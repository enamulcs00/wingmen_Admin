import { Component, OnInit } from '@angular/core';

import { LoginBody } from '../requests/login-body'
import { AuthService } from '../services/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginBody = new LoginBody();
  errorMessage: any;
  flags = {
    isLogin: false,
    isError: false
  }

  constructor(private authservice: AuthService, private toaster: ToastrManager, private router: Router) { }

  ngOnInit() {
    this.flags.isLogin = false;

  }

  login() {

    this.flags.isLogin = true;
    this.authservice.signIn(this.loginBody).subscribe((response: any) => {
      if (!response.success) {
        this.flags.isLogin = false;
        this.errorMessage = response.message;
        return this.errorToast(this.errorMessage);
      }
      this.authservice.sendToken(response.data.token)
      this.router.navigate(['/wingmen/dashboard'])

    }, error => {
      this.flags.isLogin = false;
    })
  }

  successToast(message) {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  errorToast(message) {
    this.toaster.errorToastr(message);
  }

}

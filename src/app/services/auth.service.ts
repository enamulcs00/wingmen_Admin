import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginBody } from 'src/app/requests/login-body';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  imageUrl = "https://app.mywngmn.com/";
  baseUrl = 'https://app.mywngmn.com';
 
  constructor(private http: HttpClient, private router: Router) { }

  signIn(body: LoginBody) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/signIn`, body);
  }

  sendToken(token: string) {
    localStorage.setItem("Wingmen_Admin", token)
  }

  forgotPassword(body){
    return this.http.post(`${this.baseUrl}/api/v1/admin/forgotPassword`,body);
  }

  resetPassword(body){
    return this.http.post(`${this.baseUrl}/api/v1/admin/forgotChangePassword`,body);
  }

  getToken() {
    return localStorage.getItem("Wingmen_Admin")
  }

  isLoggedIn() {
    return this.getToken() !== null;
  } 
}

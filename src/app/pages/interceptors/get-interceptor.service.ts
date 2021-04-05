import { Injectable } from '@angular/core';
import { HttpErrorResponse,HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {catchError} from "rxjs/internal/operators";
// import { LocalStorageService } from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})
export class GetInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = this.handleRequest(req);
    return next.handle(clonedReq).pipe(catchError((error, caught) => {
      this.handleAuthError(error);
      return of(error);
    }) as any);
}

  
  handleRequest(req: HttpRequest<any>) {
    const token = localStorage.getItem('Wingmen_Admin');
    let authReq;
    authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? token : ''
      })
    });
    if ((req.method.toLowerCase() == 'post' || req.method.toLowerCase() == 'put') && req.body instanceof FormData) {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': token ? token : ''
        })
      });
    }
    return authReq;
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      this.router.navigate([`/login`]);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  };
}

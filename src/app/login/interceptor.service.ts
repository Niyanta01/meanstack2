import { Injectable } from '@angular/core';
import { HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()

export class InterceptorService implements HttpInterceptor {

  constructor(private _loginService : LoginService) { }

  intercept(req, next){
    //console.log("Inside Intercept");
    const reqClone = req.clone({
      headers: new HttpHeaders().set("token", this._loginService.checkuserstatus())
    });
    //console.log(reqClone);
    return next.handle(reqClone);
  }
}

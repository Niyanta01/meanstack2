import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: any ={};

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
  }

  loginFn(){
   
    this._loginService.loginFn(this.auth);

  
  }

}
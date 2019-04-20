import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authstatus : Boolean;

  constructor(private _loginService2 : LoginService, private _http: HttpClient) { }
 
  ngOnInit() {

    this._loginService2.$subjectinstance.subscribe((data:any)=>{
     //console.log(data);
      this.authstatus = data;

  });

}

logoutFn(){

    this._loginService2.logoutFn();
   // alert("hello");
   // window.localStorage.removeItem("isLoggedIn");
    //this.$subjectinstance.next(this.checkuserstatus()); 
   // this._router.navigate(['/login']);
    
    //this._loginService.logoutFn();
    
  }

}

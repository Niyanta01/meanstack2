import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any ={};

  constructor(private _router: Router, private _http: HttpClient) { }

  signUp(){

    this._http.post("http://localhost:3000/signup", this.user)
    .subscribe((data:any)=>{
        //console.log(data);
        this._router.navigate(['/login']);

    },  function (err) {
          alert("invalid username or password ");
          this._router.navigate(['/signup']);

                });
    //console.log(this.user);
  }

  ngOnInit() {
  }

}

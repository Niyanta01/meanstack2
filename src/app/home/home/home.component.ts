import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails: any;
  usernamefromHome: any;


  constructor(private _http: HttpClient) { }

  ngOnInit() {

    this._http.get("http://localhost:3000/usernameForHome")
    .subscribe((data)=>{
      //console.log(data);
      this.userDetails = data[0];
      //console.log(this.userDetails.username);
      this.usernamefromHome = this.userDetails.username;
      //console.log(this.usernamefromHome);
    });


  }




}

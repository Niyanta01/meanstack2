import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  c_post : any ={};
  

  constructor(private _router : Router, private _http: HttpClient) { }

  ngOnInit() {
  }

  createPost(){
    //console.log(this.c_post);

    this._http.post("http://localhost:3000/createPost", this.c_post)
    .subscribe((data:any)=>{
       // console.log(data);
       
        this._router.navigate(['/listPost']);

    });
   
  }

}

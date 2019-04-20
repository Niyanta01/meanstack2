import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  $subjectinstance = new Subject();


  constructor(private _http: HttpClient) { }

  getPosts(){
    return  this._http.get("http://localhost:3000/listPost"); 
  }

  updateListPost(){
    this.$subjectinstance.next();

  }

}

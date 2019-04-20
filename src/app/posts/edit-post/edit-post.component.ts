import { Component, OnInit, Input } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
 
  @Input() pID: any ;

  edit_posts_array : any =[];
  
  showHidePostsEdit: Boolean;
  postDescription_update: any;
  
  constructor(private _http: HttpClient, private _postsService3: PostsService) {  }

  ngOnInit() {
    // console.log("Inside the edit post component");
    // console.log(this.pID);
  }

  saveNewPost(){

    var obj_edit_data ={
      "post_id": this.pID,
      "postDescription" : this.postDescription_update
    }
 
    //console.log(obj_edit_data);

    this._http.post("http://localhost:3000/editPost", obj_edit_data)
    .subscribe((data:any)=>{

    //  this.edit_posts_array = data;
      this._postsService3.updateListPost();

    });
    
  }

  


}




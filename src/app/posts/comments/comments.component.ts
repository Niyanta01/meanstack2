import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  post_obj: any =[];
  commentBody: any;
  likes_val: any = [];
  showHidePostsEdit: boolean;
  showHideComments: boolean;

  @Input() comments_val: any ;

  comments_array :any;
  pID : any;
  postID_edit :any;
  likes_name: any;
  likes_array: any = [];

 @Output() comments_event : EventEmitter<any> = new EventEmitter();
 
  constructor(private _http: HttpClient, private _postService2 : PostsService) { }

  ngOnInit() {

     this.postID_edit = this.comments_val;
     
     this._http.post("http://localhost:3000/getValueforLike", { "id": this.comments_val})
    .subscribe((data:any)=>{
      //console.log(data);
     // console.log("likes");
      //console.log(data[0].likes.length);

      this.likes_val = data[0].likes.length;
   });

   this._http.post("http://localhost:3000/getUsernameforLike",  { "id": this.comments_val})
   .subscribe((data:any)=>{
      //console.log(data);
      this.likes_array = data;
   });  
  
  }


  deletePost(){
    
    var obj_delete ={
      "id": this.comments_val
    }
    this._http.post("http://localhost:3000/deletePost",obj_delete )
    .subscribe((data)=>{
        alert("post deleted");
        this._postService2.updateListPost();
    });
    
 }

 saveComment(){

  var obj_save ={
    "post_id": this.comments_val,
    "comment": this.commentBody
  }

    this._http.post("http://localhost:3000/createComment",  obj_save)
    .subscribe((data:any)=>{
      this.sendDataFromComments();
      this.commentBody = "";
    });
 }

  sendDataFromComments(){
    
    var obj_data ={
      "post_id": this.comments_val,
      
    }
    

    this._http.post("http://localhost:3000/getComments", obj_data)
    .subscribe((data:any)=>{
     // this.comments_event.emit(data);
      this.comments_array = data;
     this.showHideComments = !this.showHideComments;
      //console.log(data);
    });

  }

  likePost(){

    this._http.post("http://localhost:3000/likePost",{ "id": this.comments_val})
        .subscribe((data:any)=>{
          this._http.post("http://localhost:3000/getValueforLike", { "id": this.comments_val})
          .subscribe((data:any)=>{
      
            this.likes_val = data[0].likes.length;
         });
  });
}


  editPosts(){
  
    this.showHidePostsEdit = !this.showHidePostsEdit;
  }


}

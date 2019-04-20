import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})

export class ListPostComponent implements OnInit {
 

   posts_details : any = [];
   post_obj: any ={};
   cmt_details :any =[];
   commentBody: any;
  
  constructor(private _http: HttpClient, private _postService : PostsService) { }

  ngOnInit() {

    this._postService.getPosts()
      .subscribe((data)=>{    
      this.posts_details = data;
    });

    this._postService.$subjectinstance.subscribe(()=>{
      this._postService.getPosts()
      .subscribe((data)=>{    
      this.posts_details = data;
      });
    });
    
   }

 

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {  RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';



import { ListPostComponent } from '../list-post/list-post.component';
import { CommentsComponent } from '../comments/comments.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { LoginGuard } from '../../login/login.guard';
import { InterceptorService } from '../../login/interceptor.service';


@NgModule({
  declarations: [
    ListPostComponent,
    CommentsComponent,
    EditPostComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: ListPostComponent, canActivate :[LoginGuard]},

    ])
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorService, 
    multi: true 
    }
  ],
})
export class ListPostModule { }

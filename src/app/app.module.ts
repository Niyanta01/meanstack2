import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {  RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { SignupComponent } from './signup/signup/signup.component';
// import { PanelBoxComponent } from './panel/panel-box/panel-box.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
// import { ListPostComponent } from './posts/list-post/list-post.component';
// import { CommentsComponent } from './posts/comments/comments.component';
import { InterceptorService } from './login/interceptor.service';
// import { EditPostComponent } from './posts/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CreatePostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    RouterModule, 
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorService, 
    multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

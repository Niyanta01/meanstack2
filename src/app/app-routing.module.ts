import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup/signup.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
// import { ListPostComponent } from './posts/list-post/list-post.component';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  { path:"listPost", loadChildren:"./posts/list-post/list-post.module#ListPostModule"},
  { path: "signup", component: SignupComponent},
  { path: "login", component: LoginComponent },
  { path: "home" , component: HomeComponent, canActivate :[LoginGuard]},
  { path: "createPost" , component: CreatePostComponent, canActivate :[LoginGuard]},
  // { path: "listPost", component: ListPostComponent, canActivate :[LoginGuard]},
  { path: "", redirectTo:"home", pathMatch:"full"},
  { path: "**", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 

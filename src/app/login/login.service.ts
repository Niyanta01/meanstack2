import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  $subjectinstance = new BehaviorSubject(this.checkuserstatus());

 
  constructor(private _http: HttpClient, private _router: Router) { }

  loginFn(auth: any){

    this._http.post("http://localhost:3000/login", auth)
    .subscribe((resp:any)=>{
      if (resp.isLoggedIn) {
        console.log(resp);
        //console.log(resp.length);
        //console.log(resp.token);
        window.localStorage.setItem("isLoggedIn", resp.token);
        this.$subjectinstance.next(this.checkuserstatus()); 
        this._router.navigate(['/home']);
        //console.log();
        
       
    } else {
        alert("login invalid");
        this._router.navigate(['/login']);
    }
    });
  
  }


  checkuserstatus() {
    return window.localStorage.getItem("isLoggedIn") || ""; 
  }

  logoutFn(){

   // alert("ehlle");
    window.localStorage.removeItem("isLoggedIn");
    this.$subjectinstance.next(this.checkuserstatus()); 
    this._router.navigate(['/login']);
    
  }
  
}

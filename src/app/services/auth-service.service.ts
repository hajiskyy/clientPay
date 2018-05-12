import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import  * as firebase from "firebase/app";

@Injectable()
export class AuthServiceService {
  authState: any;
  user: Observable<any>;
  constructor(public auth: AngularFireAuth) {
    auth.authState.subscribe(auth => {
      this.authState = auth;
    })
    // auth.auth.onAuthStateChanged(user => {
    //   if(user) {
    //     this.authState = true;
    //   }else {
    //     this.authState = false;
    //   }
    // })
   }

  register(email: string, password: string){
    return this.auth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }

  login(email: string, password: string){
    return this.auth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  // getUser(){
  //   return this.authenticated ? this.auth.auth.currentUser: null;
  // }

  logOut(){
    return this.auth.auth.signOut()
  }

  //returns true if user is logged in
  get authenticated(): boolean{
    return this.authState !== null;
  }

}

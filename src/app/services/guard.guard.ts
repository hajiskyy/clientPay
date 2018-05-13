import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthServiceService } from "../services/auth-service.service";
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class GuardGuard implements CanActivate {
  public user = null;
  constructor(private auth: AngularFireAuth, private router: Router){
    this.auth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = this.auth.auth.currentUser;
      }
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.authState.map((auth) =>  {
        if(auth == null) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      });
  }
}

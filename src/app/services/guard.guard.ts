import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthServiceService } from "../services/auth-service.service";

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.authenticated){return true}
      this.router.navigate(['/login']);      
    return false;
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ControllerService } from '../controller.service';

@Injectable({
  providedIn: 'root',
})
export class CheckloginGuard implements CanActivate {
  constructor(private router: Router, private controller: ControllerService) {}
  redirectToLogin(flag: boolean) {
    if (!flag) {
      this.router.navigate(['/login']);
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const valu = localStorage.getItem('currentUser');
    if (valu == 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

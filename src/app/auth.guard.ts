import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {AlertService} from '@full-fledged/alerts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(
        private router: Router,
        private authenticationService: AuthService,
        private  alertService: AlertService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.loggedIn()) {
            return true;
        }
        this.alertService.danger('You are not logged in!');
        this.router.navigate(['/login']).then();
    }
}

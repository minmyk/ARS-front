import { Component } from '@angular/core';
import { User} from './models/user';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ars';
  currentUser: User;
  constructor(
      private router: Router,
      private authenticationService: AuthService,
      private alertService: AlertService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  get isLoggedIn(): any {
      console.log(this.currentUser);
      return this.authenticationService.loggedIn();
    }
  logout(): void {
      this.authenticationService.logout();
      this.router.navigate(['/login']).then();
      this.alertService.success('Logged out!');
  }

  scroll(el: HTMLElement): void {
  el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService} from '../auth.service';
import { AlertService} from '@full-fledged/alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  constructor( private authService: AuthService,
               private alertService: AlertService,
               private route: ActivatedRoute,
               private router: Router
              ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams[''] || '/';
  }

  onSubmit(f: NgForm): any {
    const loginObserver = {
      next: x => {
        if (x.status === 'ok') {
          this.alertService.success('Successfully logged in!');
          this.authService.getApiCredentials(f.value).subscribe(apiObserver);
          this.router.navigate([this.returnUrl]).then();
        }
        else {this.alertService.danger('Something went wrong. Please check your password and username.'); }
      }
    };
    const apiObserver = {
      next: x => {
       if (x.status === 'ok') {this.alertService.success('Successfully retrieved API key and uid'); }
       else {this.alertService.warning('Something went wrong. Please try again.'); }
      }
    };
    this.authService.login(f.value).subscribe(loginObserver);
  }
}

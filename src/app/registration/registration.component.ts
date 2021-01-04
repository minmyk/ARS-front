import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { AlertService } from '@full-fledged/alerts';
import {ActivatedRoute, Router} from '@angular/router';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myForm: FormGroup;
  hide = true;
  matcher = new CustomErrorStateMatcher();
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {

    this.myForm = this.formBuilder.group({
      login: ['',  [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams[''] || '/';
  }
  onSubmit(): any {
     const RegObserver = {
      next: x => {
       if (x.status === 'ok') {
         this.alertService.success('Successfully registered!');
         this.router.navigate([this.returnUrl]).then();
       }
       else {this.alertService.warning('Username is already taken!'); }
      }
    };
     delete this.myForm.value.confirmPassword;
     // console.
     this.authService.register(this.myForm.value).subscribe(RegObserver);
  }
  checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPassword').value;
  return pass === confirmPass ? null : { notSame: true };
}
}


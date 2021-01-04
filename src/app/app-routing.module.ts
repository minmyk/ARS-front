import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { UserComponent } from './user/user.component';
import {AuthGuard} from './auth.guard';
import {TeamComponent} from './team/team.component';
import {PaymentComponent} from './payment/payment.component';
import {UserGuideComponent} from './user-guide/user-guide.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { }
    },
    {
        path: 'services',
        component: ServicesComponent
    },
    {
        path: 'team',
        component: TeamComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { }
    },
    {
        path: 'user_guide',
        component: UserGuideComponent,
        canActivate: [AuthGuard],
        data: { }
    },
    {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [AuthGuard],
        data: { }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },

    // otherwise redirect to home
    {
      path: '**', redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

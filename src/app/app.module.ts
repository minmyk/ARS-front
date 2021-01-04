import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import {RouterModule} from '@angular/router';
import { AuthModule } from './auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@full-fledged/alerts';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { TeamComponent } from './team/team.component';
import { PaymentComponent } from './payment/payment.component';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    AboutComponent,
    ServicesComponent,
    HomeComponent,
    SliderComponent,
    RegistrationComponent,
    TeamComponent,
    PaymentComponent,
    UserGuideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'}),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

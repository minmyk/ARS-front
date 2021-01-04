import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from './models/user';
import {environment} from '../environments/environment.prod';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  helper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
     this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  login(model: any): any {
    return this.http.get(this.apiUrl + 'login', {params: model}).pipe(
      map((response: any) => {
        if (response.status === 'ok') {
          localStorage.setItem('currentUser', model.login);
          this.currentUserSubject.next(model.login);
        }
        return response;
      })
    );
  }
  getApiCredentials(model: any): any {
    return this.http.get(this.apiUrl + 'get_api_credentials', {params: model}).pipe(
      map((response: any) => {
        if (response.error === '') {
          const user: User = {login: localStorage.getItem('currentUser'), apiKey: response.api_key, apiUid: response.api_uid};
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return response;
      })
    );
  }
  getMetrics(apiUid: string): any {
    return this.http.get(this.apiUrl + 'get_metrics', {params: {api_uid: apiUid}}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  beginTraining(apiUid: string): any { // needs update
    return this.http.get(this.apiUrl + 'start_training', {params: {api_uid: apiUid}}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getTrainingStatus(apiUid: string): any {
    return this.http.get(this.apiUrl + 'get_training_status', {params: {api_uid: apiUid}}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  register(model: any): any {
    return this.http.post<any>(this.apiUrl + 'registration', {}, {params: model}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  loggedIn(): boolean {
    return localStorage.hasOwnProperty('currentUser');
  }

  logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.currentUserSubject.next(null);
    }
}

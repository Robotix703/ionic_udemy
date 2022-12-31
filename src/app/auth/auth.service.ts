import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<User>(null);

  private _userIsAuthenticated = false;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => !!user.token))
  }

  constructor(private http: HttpClient) { }

  login(){
    this._userIsAuthenticated = true;
  }

  logout(){
    this._userIsAuthenticated = false;
  }

  signup(email: string, password: string){
    this._userIsAuthenticated = true;
    return this.http.post<User>('url', {email: email, password: password})
    .pipe(tap(resData => {
      this._user.next(new User(resData.id, resData.email, resData.token))
    }));
  }
}

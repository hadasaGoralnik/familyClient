import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../MODELS/user.model';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from '../DTO/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser:User
  userSubject = new Subject<{
    isLoggedIn: boolean;
    user: User;
  }>()
 isLogedIn:boolean=false

  constructor( public http:HttpClient) { 
  }

  login(request:LoginRequest):Observable<any>{
    return this.http.post(
      'https://localhost:44328/api/user/login',
      request
    );
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setUseLogin(isLoggedIn: boolean, user: User) {
    this.isLogedIn = isLoggedIn;
    this.currentUser = user;
    this.userSubject.next({ isLoggedIn, user });
  }
}

import { Injectable } from '@angular/core';
import { User } from '../MODELS/user.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../DTO/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

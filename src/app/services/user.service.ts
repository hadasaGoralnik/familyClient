import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../DTO/MODELS/user.model';
import { LoginRequest } from '../DTO/Requests/login-request';
import { UnsubscribeRequest } from '../DTO/Requests/unsubscribe-request';
import { UserRequest } from '../DTO/Requests/user-request';

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
    if(this.currentUser == null && localStorage.getItem('user'))
    {
     return <User> JSON.parse( localStorage.getItem('user'));
    }
    return this.currentUser;
  }

  setUseLogin(isLoggedIn: boolean, user: User) {
    this.isLogedIn = isLoggedIn;
    this.currentUser = user;
    this.userSubject.next({ isLoggedIn, user });
  }
  SignUp(request:UserRequest):Observable<any>{
    return this.http.post(
      'https://localhost:44328/api/user/signup',
      request
    );
  }
  UpdateUser(request:UserRequest):Observable<any>{
    return this.http.post(
      'https://localhost:44328/api/user/updateuser',
      request
    );}
    Unsubscribe(request:UnsubscribeRequest):Observable<any>{
      return this.http.post(
        'https://localhost:44328/api/user/Unsubscribe',
        request
      );}
      GetUserById(userId:number):Observable<any>{
        return this.http.get(`https://localhost:44328/api/user/GetUserById/${userId}`)
    }
  
}

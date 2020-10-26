import { Injectable } from '@angular/core';
import { SignUpRequest } from '../DTO/Requests/sign-up-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(public http:HttpClient) { }
  SignUp(request:SignUpRequest):Observable<any>{
    return this.http.post(
      'https://localhost:44328/api/user/signup',
      request
    );
  }
}

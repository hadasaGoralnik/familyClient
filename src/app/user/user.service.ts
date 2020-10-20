import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../MODELS/user.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user=new EventEmitter<User>();
private userSelect:User;

  constructor( public http:HttpClient) { 
    this.user.subscribe(x=>{
      this.userSelect=x;
    })
  }
getUser(user:User ){
this.user.emit(user);
}
  sighin(user:User):Observable<User>{
    const user1={
      "userName":"sara",
      "id":1
    }
    return this.http.post<User>(`https://localhost:44328/api/user`,user)
  }

  login(password:string,name:string):Observable<User>{
    // console.log(user)
   const user1={
      "userName":"sara",
      "id":1
    }
    // password=1&name=sara
    // password=${user.password}&name=${user.userName}
  return this.http.get<User>(`https://localhost:44328/api/user?password=${password}&name=${name}`)
//hhtp:klocalhost/api/user?id=${user.id}&name=${user.name}`
  }
}

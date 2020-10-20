import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(public http: HttpClient) { 

  }
  
  getEvents(groupId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`https://localhost:44328/api/events/getEventsByGroupId/${groupId}`)

  }

  //   login(password:string,name:string):Observable<User>{
  //     // console.log(user)
  //    const user1={
  //       "userName":"sara",
  //       "id":1
  //     }
  //     // password=1&name=sara
  //     // password=${user.password}&name=${user.userName}
  //   return this.http.get<User>(`https://localhost:44328/api/user?password=${password}&name=${name}`)
  // //hhtp:klocalhost/api/user?id=${user.id}&name=${user.name}`
  //   }
}

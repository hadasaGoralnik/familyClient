import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../DTO/MODELS/events';
import { Menu } from '../DTO/MODELS/menu';
import { Picture } from '../DTO/MODELS/picture';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(public http: HttpClient) { 

  }
  getEvents(groupId: number): Observable<Events[]> {
    return this.http.get<Events[]>(`https://localhost:44328/api/events/getEventsByGroupId/${groupId}`)

  }
  GetEventById(id:number): Observable<Events>{
    return this.http.get<Events>(`https://localhost:44328/api/events/getEventById/${id}`);
  }
  GetPicturesByEventId(id:number): Observable<Picture[]>{
    return this.http.get<Picture[]>(`https://localhost:44328/api/events/GetPicturesByEventId/${id}`);
  }
  GetMenusEventId(id:number): Observable<Menu[]>{
    return this.http.get<Menu[]>(`https://localhost:44328/api/events/GetMenusEventId/${id}`);
  }
}

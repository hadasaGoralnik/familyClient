import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../DTO/MODELS/events';
import { EventsKind } from '../DTO/MODELS/events-kind';
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
  GetAllEventsKind():Observable<EventsKind[]>
  {
    return this.http.get<EventsKind[]>(`https://localhost:44328/api/events/GetAllEventsKind`);
  }
  push(events:Events):Observable<any> 
  {
    return this.http.post('https://localhost:44328/api/events/CreateEvents',events);
  }

  public uploadImage(file: File, eventId: number): Observable<ArrayBuffer> {
    let input = new FormData();
    input.append('file', file, file.name);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    let options = { headers: headers };

    return this.http.post<ArrayBuffer>('https://localhost:44328/api/events/upload/' + eventId, input, options);
  }

}

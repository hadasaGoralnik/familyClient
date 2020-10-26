import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetGroupsRequest } from '../DTO/Requests/get-groups-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }
  GetGroups(request:GetGroupsRequest): Observable<any>{
    return this.http.get<GetGroupsRequest>(`https://localhost:44328/api/group/getGroups/${request.UserId}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetGroupsRequest } from '../DTO/Requests/get-groups-request';
import { HttpClient } from '@angular/common/http';
import { DeleteGroupRequest } from '../DTO/Requests/delete-group-request';
import { AddGroupRequest } from '../DTO/Requests/add-group-request';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }
  GetGroups(request:GetGroupsRequest): Observable<any>{
    return this.http.get<GetGroupsRequest>(`https://localhost:44328/api/group/getGroups/${request.UserId}`);
  }
  DeleteGroup(request:DeleteGroupRequest){
    return this.http.post('https://localhost:44328/api/group/deletegroup',request);
  }
  AddGroup(request:AddGroupRequest):Observable<any>{
    return this.http.post(
      'https://localhost:44328/api/group/addgroup',
      request
    );
  
  }
}

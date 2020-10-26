import { Injectable } from '@angular/core';
import { AddGroupRequest } from '../DTO/Requests/add-group-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddGroupService {

  constructor(private http:HttpClient ){ }
  AddGroup(request:AddGroupRequest):Observable<any>{
    return this.http.post(
      'https://localhost:44328/api/group/addgroup',
      request
    );
  
  }
}

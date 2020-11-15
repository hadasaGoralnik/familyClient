import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddChatMessageRequest } from '../DTO/Requests/add-chat-message-request';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
websocket:WebSocket
  constructor(private http:HttpClient) { }

  connect(groupId:number,userId:number){
    console.log("connect")
     this.websocket= new WebSocket(`wss://localhost:44328/api/WSChat/Get/${groupId}/${userId}`)
  }

  addChatMessage(request:AddChatMessageRequest):Observable<any>{
    return this.http.post(
      'https://localhost:44328/api/WSChat/addChatMessage',
      request
    );
  }

  GetMessages(groupId:number):Observable<any>{
      return this.http.get(`https://localhost:44328/api/WSChat/GetMessages/${groupId}`)
  }
}

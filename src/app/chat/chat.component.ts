import { NgContentAst } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatMessage } from '../DTO/MODELS/chat-message';
import { Group } from '../DTO/MODELS/group';
import { User } from '../DTO/MODELS/user.model';
import { ChatService } from '../services/chat.service';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit ,OnDestroy{

  addChatMessageForm:FormGroup
  currentUser:User=new User();
  currentGroup:Group
  users: { [id: string]: User } = {};

  messages:Array<ChatMessage>
  constructor(private chatService:ChatService,private userService:UserService,private groupService:GroupService,private fb:FormBuilder) {
    this.messages=new Array<ChatMessage>()

   }

ngOnInit() {
  
  var self =this
    this.currentUser=this.userService.getCurrentUser()
    this.currentGroup=this.groupService.currentGroup
    console.log(this.currentUser)
    this.addChatMessageForm=this.fb.group({
      Body: ["",[Validators.required]],
      UserID: [this.currentUser?.Id,[Validators.required]],
      GroupId:[this.currentGroup.Id,[Validators.required]]
  
    })
    this.chatService.connect(this.currentGroup?.Id,this.userService.getCurrentUser()?.Id)
    this.GetMessages()
    console.log(this.messages)
    var ws=this.chatService
    this.chatService.websocket.onopen= function(evt){
      console.log("socket open"+evt)
      ws.websocket.onmessage=(evt=>{
        console.log((evt as MessageEvent).data)
    var msgArray=((evt as MessageEvent).data as string).split("-")
    let msg:ChatMessage=new ChatMessage()
    msg.UserID=+msgArray[0] 
      msg.Body=msgArray[1]
      msg.GroupId=+msgArray[2]
      msg.Date=new Date(msgArray[3])
      self.GetUserById(msg.UserID)
      self.messages.push(msg)
    })
    ws.websocket.onclose=((evt=>console.log("close socket")))
    }
}
AddMessage()
{

  this.chatService.addChatMessage(this.addChatMessageForm.value)
  .subscribe(x=>{
    console.log(x);
   
    this.chatService.websocket.send(JSON.stringify({UserId:this.userService.getCurrentUser().Id,GroupId:this.currentGroup.Id,msg:this.Body.value}))
    this.Body.setValue("")
})
}
function() {
  document.ontouchmove = function(e){
       e.preventDefault();
       }
}
GetMessages(){
  this.chatService.GetMessages(this.currentGroup.Id).subscribe(messages=>{
    
    (messages as Array<any>).forEach(msg => {
      let m:ChatMessage=new ChatMessage()
      m.Id==msg.Id
      m.Body=msg.Body
      m.GroupId=msg.GroupId
      m.UserID=msg.UserId
      console.log(msg.Date)
      m.Date=new Date(msg.Date)
      this.messages.push(m)
      this.GetUserById(m.UserID)
    });
       
        console.log(this.messages)}
    )
}
GetUserById(userId:number){
  this.userService.GetUserById(userId).subscribe(user=>{this.users[user.Id]=user})
}
send(){
  this.chatService.websocket.send(JSON.stringify({UserId:this.userService.getCurrentUser().Id,GroupId:this.currentGroup.Id,msg:"hhhh"}))
}
FirstLetter(userId:string):string{
  var name=userId?.toUpperCase()
  return name?.substring(0,2)
}
get Body() { return this.addChatMessageForm.get('Body'); }
ngOnDestroy(): void {
  this.chatService.websocket?.close();
}

}





import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Group } from 'src/app/DTO/MODELS/group';
import { ChatService } from 'src/app/services/chat.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.css']
})
export class DisplayGroupComponent implements OnInit,OnDestroy {

  currentGroup:Group
  groupSubject:Subject<Group>=new Subject<Group>()

  constructor(private groupService:GroupService,private chatService:ChatService,private userService:UserService) {

  }
  

  ngOnInit(): void {
    this.currentGroup=this.groupService.currentGroup
    this.groupSubject.next(this.currentGroup)
    this.chatService.connect(this.currentGroup?.Id,this.userService.getCurrentUser()?.Id)

  }
  send(){
    this.chatService.websocket.send(JSON.stringify({UserId:this.userService.getCurrentUser().Id,GroupId:this.currentGroup.Id,msg:"hhhh"}))
  }
  ngOnDestroy(): void {
    this.chatService.websocket?.close();
  }
  // AddImag(){
  //   this.groupService.AddImag()
  // .subscribe(x=>{
  //   console.log(x);
  // })
  // }
  
}

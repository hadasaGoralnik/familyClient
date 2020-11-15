import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { GetGroupsRequest } from 'src/app/DTO/Requests/get-groups-request';
import { User } from 'src/app/DTO/MODELS/user.model';

import { Group } from 'src/app/DTO/MODELS/group';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  currentUser:User
  groups:Array<Group>
  constructor(private groupService:GroupService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser= this.userService.currentUser
    this.GetGroups()
  }

  GetGroups(){
  this.groupService.GetGroups({UserId:this.currentUser.Id}).subscribe(groups=>{
    this.groups=groups
    console.log(this.groups)
  }
)
  }
  addGroup(){
      this.router.navigate(['/add-group'] );
  }
  deleteGroup(groupId:number){
    alert("Are you sure you want to delete the entire group?");
    this.groupService.DeleteGroup({GroupId:groupId}).subscribe(group=>{
      var index=this.groups.findIndex(group=>group.Id==groupId)
      this.groups.splice(index,1)
      console.log(this.groups)
      
    })
  }
  routeToDisplatGroup(group:Group){
    this.groupService.currentGroup=group
    this.router.navigate(['/display-group'] );
  }
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../DTO/MODELS/user.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-user-list-of-group',
  templateUrl: './user-list-of-group.component.html',
  styleUrls: ['./user-list-of-group.component.css']
})
export class UserListOfGroupComponent implements OnInit {
  users:Array<User>
  constructor(private groupService:GroupService,private router:Router) { }

  ngOnInit(): void {
   this.groupService.GetUsers(this.groupService.currentGroup.Id).subscribe(users=>{
    this.users=users
    console.log(users)
    console.log(this.users)
   })
  }
   DeleteUserFromGroup(UserId:number){
     console.log("DeleteUserFromGroup")
    this.groupService.DeleteUserFromGroup({GroupId:this.groupService.currentGroup.Id,UserId:UserId}).subscribe(group=>{
      var index=this.users.findIndex(user=>user.Id==UserId)
      this.users.splice(index,1)
      console.log(this.users)
    },err=>  this.router.navigate(['/group-list/']))
  
  }
  RouteToAddUser(){
    this.router.navigate(['/add-user/'])
  }
}

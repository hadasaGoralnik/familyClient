import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { User } from 'src/app/DTO/MODELS/user.model';
import { GroupService } from 'src/app/services/group.service';
@Component({
  selector: 'app-user-list-of-group',
  templateUrl: './user-list-of-group.component.html',
  styleUrls: ['./user-list-of-group.component.css']
})

export class UserListOfGroupComponent implements OnInit {
  users:Array<User>
  
  constructor(private groupService:GroupService,private router:Router) { 

  }

  ngOnInit(): void {
   
    this.GetUsers()
  }
  GetUsers(){
    if(this.groupService.currentGroup){
    this.groupService.GetUsers(this.groupService.currentGroup.Id).subscribe(users=>{
      this.users=users
    }
  )
    }}
    
  // search(s: string){
  //     this.users = this.users.filter(u => )
  // }
   DeleteUserFromGroup(UserId:number){
     console.log("DeleteUserFromGroup")
     if(this.groupService.currentGroup){
      this.groupService.DeleteUserFromGroup({GroupId:this.groupService.currentGroup.Id,UserId:UserId}).subscribe(group=>{
        this.ngOnInit()
      },err=>  this.router.navigate(['/group-list/']))
    }
  }
  
  RouteToAddUser(){
    this.router.navigate(['/add-user/'])
  }
  FirstLetter(userId:string):string{
    var name=userId.toUpperCase()
    return name.substring(0,2)
  }
}

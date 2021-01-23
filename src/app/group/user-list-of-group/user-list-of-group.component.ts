import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { Group } from 'src/app/DTO/MODELS/group';
import { User } from 'src/app/DTO/MODELS/user.model';
import { GroupService } from 'src/app/services/group.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-list-of-group',
  templateUrl: './user-list-of-group.component.html',
  styleUrls: ['./user-list-of-group.component.css']
})

export class UserListOfGroupComponent implements OnInit {
  users:Array<User>
  currentGroup:Group;
  constructor(private groupService:GroupService,private router:Router ) { 

  }

  ngOnInit(): void {
   this.currentGroup=this.groupService.currentGroup;
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
    Swal.fire({
      html: 'Are you sure that you want to delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value){
     if(this.groupService.currentGroup){
      this.groupService.DeleteUserFromGroup({GroupId:this.groupService.currentGroup.Id,UserId:UserId}).subscribe(group=>{
        if (group) {
          Swal.fire('Success', 'the user was deleted sucessfully', 'success')
          this.ngOnInit()
        }
      }, (err => {
        Swal.fire('Opss...', '):Something went Worng', 'error');
        this.router.navigate(['/group-list/'])
      }));
    }
      
    }
  });
}
  
  RouteToAddUser(){
    this.router.navigate(['/add-user/'])
  }
  FirstLetter(userId:string):string{
    var name=userId.toUpperCase()
    return name.substring(0,2)
  }
}

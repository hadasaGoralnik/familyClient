import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { GetGroupsRequest } from 'src/app/DTO/Requests/get-groups-request';
import { User } from 'src/app/DTO/MODELS/user.model';
import { LoginService } from 'src/app/services/login.service';
import { Group } from 'src/app/DTO/MODELS/group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  currentUser:User
  groups:Array<Group>
  constructor(private groupService:GroupService,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser= this.loginService.currentUser
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

}

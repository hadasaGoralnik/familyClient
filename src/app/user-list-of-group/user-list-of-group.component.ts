import { Component, OnInit } from '@angular/core';
import { User } from '../DTO/MODELS/user.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-user-list-of-group',
  templateUrl: './user-list-of-group.component.html',
  styleUrls: ['./user-list-of-group.component.css']
})
export class UserListOfGroupComponent implements OnInit {
  users:Array<User>
  constructor(private groupService:GroupService) { }

  ngOnInit(): void {
   this.groupService.GetUsers(this.groupService.currentGroup.Id).subscribe(users=>{
    this.users=users
    console.log(users)
    console.log(this.users)
   })
 
  }

}

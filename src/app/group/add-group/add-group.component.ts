import { Component, OnInit } from '@angular/core';
import { AddGroupRequest } from 'src/app/DTO/Requests/add-group-request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/DTO/MODELS/user.model';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  addGroupForm:FormGroup
  currentUser:User
  constructor(private groupService:GroupService,private fb:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser=this.userService.currentUser
    this.addGroupForm=this.fb.group({
      Name: ["",[Validators.required]],
      UserId:[this.currentUser.Id,[Validators.required]],
    })
  }
AddGroup()
{ this.groupService.AddGroup(this.addGroupForm.value)
  .subscribe(x=>{
    console.log(x);
    alert("The group created successfully")
    this.router.navigate(['/group-list/'])
  })}
}

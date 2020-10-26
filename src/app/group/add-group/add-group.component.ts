import { Component, OnInit } from '@angular/core';
import { AddGroupRequest } from 'src/app/DTO/Requests/add-group-request';
import { AddGroupService } from 'src/app/services/add-group.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/DTO/MODELS/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  addGroupForm:FormGroup
  currentUser:User
  constructor(private addGroupService:AddGroupService,private fb:FormBuilder,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser=this.loginService.currentUser
    this.addGroupForm=this.fb.group({
      Name: ["",[Validators.required]],
      ManagerId: [this.currentUser.Id],
    })
  }
AddGroup()
{ this.addGroupService.AddGroup(this.addGroupForm.value)
  .subscribe(x=>{
    console.log(x);
    alert("The group created successfully")
    this.router.navigate(['/group-list/'])
  })}
}

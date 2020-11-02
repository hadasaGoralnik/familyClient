import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.css']
})
export class AddUserToGroupComponent implements OnInit {

  myForm: FormGroup;
  constructor(private fb:FormBuilder,private groupService:GroupService,private router:Router) { }

  ngOnInit(): void {

    this.myForm=this.fb.group({
      GroupId: ["",[Validators.required]],
      UserName: ["",[Validators.required]],
      Mail: ["",[Validators.required,Validators.email]],
      FirstName: ["",[Validators.required]],
      LastName: ["",[Validators.required]],
      IsMale: ["",[Validators.required]],
      Password: ["",[Validators.required]], 
    })
  }
  AddUserToGroup()
  { 
    console.log("in add component")
    this.GroupId.setValue(this.groupService.currentGroup.Id)
    this.groupService.AddUserToGroup(this.myForm.value)
    .subscribe(x=>{
      console.log(x);
      alert("User Added to group")
      this.router.navigate(['/display-group/'])
    })}
    get GroupId() { return this.myForm.get('GroupId'); }
}

import { Component, OnInit } from '@angular/core';
import{FormBuilder}from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/MODELS/group';
import { GroupService } from 'src/app/group/group.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
   groupSepcific:Group;
  myForm: FormGroup;
  constructor(private fb:FormBuilder,private groupService:GroupService) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      group:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }
  onSubmit(){
    let x = this.myForm.value;
    console.log(this.myForm.value)
  }
}

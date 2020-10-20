import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{FormBuilder}from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { User } from '../../MODELS/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userSepcific:User;
myForm: FormGroup;
  constructor(private userService:UserService,private fb:FormBuilder) { }

  ngOnInit(): void {
  this.myForm=this.fb.group({
    name:["",[Validators.required]],
    password:["",[Validators.required]]
  })
 
  }
  onSubmit(){
    let x = this.myForm.value;
    console.log(this.myForm.value)
 this.userService.login(x.password,x.name).subscribe(x=>{console.log(x)})
  }
}

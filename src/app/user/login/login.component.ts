import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{FormBuilder}from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { User } from '../../MODELS/user.model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userSepcific:User;
myForm: FormGroup;
  constructor(private loginService:LoginService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  this.myForm=this.fb.group({
    UserName:["",[Validators.required]],
    Password:["",[Validators.required]]
  })
 
  }
  onSubmit(){
      if (!this.myForm.valid) return;
      this.loginService.login(this.myForm.value)
        .subscribe(
          (user: User) => {
            this.loginService.setUseLogin(true, user);
           console.log("User:",this.loginService.getCurrentUser(),"IsLogedIn",this.loginService.isLogedIn)
          },
          (err) => {
            console.log(err)
            alert('The login failed, inCorrect user name or passward');
          }
        );
  }
}

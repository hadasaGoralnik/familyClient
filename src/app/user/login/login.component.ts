import { Component, OnInit } from '@angular/core';
import{FormBuilder}from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/DTO/MODELS/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

myForm: FormGroup;
  constructor(private userService:UserService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  this.myForm=this.fb.group({
    UserName:["",[Validators.required]],
    Password:["",[Validators.required]]
  })
 
  }
  onSubmit(){
      if (!this.myForm.valid) return;
      this.userService.login(this.myForm.value)
        .subscribe(
          (user: User) => {
          localStorage.setItem('user',JSON.stringify(user));
            this.userService.setUseLogin(true, user);
           console.log("User:",this.userService.getCurrentUser(),"IsLogedIn",this.userService.isLogedIn)
           this.router.navigate(['/group-list/']);
          },
          (err) => {
            console.log(err)
            alert('The login failed, inCorrect user name or passward');
          }
        );
  }
  get UserName() { return this.myForm.get('UserName'); }
  get Password() { return this.myForm.get('Password'); }
}

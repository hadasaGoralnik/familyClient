import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{FormBuilder}from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { User } from '../../MODELS/user.model';
@Component({
  selector: 'app-sigh-up',
  templateUrl: './sigh-up.component.html',
  styleUrls: ['./sigh-up.component.css']
})
export class SighUpComponent implements OnInit {

  myForm: FormGroup;
  constructor(private userService:UserService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      name:["",[Validators.required]],
      password:["",[Validators.required]],
      managerPassowrd:["",[Validators.required]],
      generation:[]
    })
  }
  save(){
    // this.userService.signin(this.myForm.value)
    // .subscribe(x=>{
    //   console.log(x);
    // })
  }
}

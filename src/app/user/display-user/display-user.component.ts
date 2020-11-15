import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/DTO/MODELS/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
currentUser:User
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser=this.userService.currentUser
  }
  FirstLetter(userId:string):string{
    var name=userId.toUpperCase()
    return name.substring(0,2)
  }
  Unsubscribe(){
    console.log("DeleteUserFromGroup")
   this.userService.Unsubscribe({UserId:this.userService.currentUser.Id}).subscribe(user=>{
  this.userService.setUseLogin(false,null);
  this.router.navigate(['']);
   })
   
 }

}

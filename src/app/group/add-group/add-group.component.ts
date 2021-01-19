import { Component, OnInit } from '@angular/core';
import { AddGroupRequest } from 'src/app/DTO/Requests/add-group-request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/DTO/MODELS/user.model';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  addGroupForm:FormGroup
  currentUser:User
  url:string
  constructor(private groupService:GroupService,private fb:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser=this.userService.currentUser
    this.addGroupForm=this.fb.group({
      Name: ["",[Validators.required]],
      UserId:[this.currentUser.Id,[Validators.required]],
      Image: [""],
    })
  }
  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result as string


        this.addGroupForm.get('Image').setValue(this.url)

      }
    }
  }
AddGroup()
{ this.groupService.AddGroup(this.addGroupForm.value)
  .subscribe(x=>{
    if (x) {
      Swal.fire('Success', 'the group was saved sucessfully', 'success')
      this.router.navigate(['/group-list/'])
    }
  }, (err => {
    Swal.fire('Opss...', '):Something went Worng', 'error');
  }));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/DTO/MODELS/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  url: string;
  myForm: FormGroup;
  currentUser:User;
  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser=this.userService.currentUser
    this.myForm=this.fb.group({
      Id:[this.currentUser.Id,[Validators.required]],
      UserName: [this.currentUser.UserName,[Validators.required]],
      Birthday: [this.currentUser.Birthday?this.currentUser.Birthday :""],
      MarryDate: [this.currentUser.MarryDate?this.currentUser.MarryDate:""],
      Mail: [this.currentUser.Mail,[Validators.required,Validators.email]],
      FirstName: [this.currentUser.FirstName,[Validators.required]],
      LastName: [this.currentUser.LastName,[Validators.required]],
      Address: [this.currentUser.Address?this.currentUser.Address:""],
      IsMale: [this.currentUser.IsMale,[Validators.required]],
      Image: [this.currentUser.Image?this.currentUser.Image:""],
      Password: [this.currentUser.Password,[Validators.required]], 
    })
  }
  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result as string;


        this.myForm.get('Image').setValue(this.url)

      }
    }
  }
  save(){
    this.userService.UpdateUser(this.myForm.value)
    .subscribe(x=>{
      if (x) {
        Swal.fire('Success', 'the user was saved sucessfully', 'success')
      }
    }, (err => {
      Swal.fire('Opss...', '):Something went Worng', 'error');
    }));
}
}

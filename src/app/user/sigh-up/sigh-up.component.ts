import { Component, OnInit } from '@angular/core';
import{FormBuilder}from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sigh-up',
  templateUrl: './sigh-up.component.html',
  styleUrls: ['./sigh-up.component.css']
})
export class SighUpComponent implements OnInit {
  url: string;
  myForm: FormGroup;
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      UserName: ["",[Validators.required]],
      Birthday: [""],
      MarryDate: [""],
      Mail: ["",[Validators.required,Validators.email]],
      FirstName: ["",[Validators.required]],
      LastName: ["",[Validators.required]],
      Address: [""],
      IsMale: ["",[Validators.required]],
      Image: [""],
      Password: ["",[Validators.required]], 
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
    this.userService.SignUp(this.myForm.value)
    .subscribe(x=>{
      console.log(x);
      this.router.navigate(['/login/']);
    },
    (err) => {

      alert('The sigh-up failed, Username already exists');
    })

  }
  get UserName() { return this.myForm.get('UserName'); }
  get Password() { return this.myForm.get('Password'); }
}

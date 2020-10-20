import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      name:["",[Validators.required]],
      lastname:["",[Validators.required]],
      mail:["",[Validators.required]]
    })
  }
  onSubmit(){
    let x = this.myForm.value;
    console.log(x)
  }
}

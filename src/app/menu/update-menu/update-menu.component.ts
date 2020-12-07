import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      MenuOrder:["",[Validators.required]],
      Name:["",[Validators.required]],
      Quantity:["",[Validators.required]],
      Cost:["",[Validators.required]]
    })
  }
  onSubmit(){
    let x = this.myForm.value;
    console.log(x)
  }
}

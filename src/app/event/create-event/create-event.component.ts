import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      Title:["",[Validators.required]],
      date:["",[Validators.required]],
      address:["",[Validators.required]],
      description:["",[Validators.required]]
    })
  }
  onSubmit(){
    let x = this.myForm.value;
    console.log(x)
  }
}

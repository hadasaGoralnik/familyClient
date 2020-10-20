import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      name:[],
      lastname:[],
      password:[],
      mail:[],
      father:[],
      mother:[],
      status:[],
      sex:[],
      wifeOrHusband:[],
      birthday:[],
      marrydate:[],
      city:[],
      adress:[],
      generation:[]
    })
  }
  onSubmit(){
    let x = this.myForm.value;
    console.log(x)
  }
}

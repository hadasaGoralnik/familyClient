import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { EventsKind } from 'src/app/DTO/MODELS/events-kind';
import { EventsService } from 'src/app/services/events.service';
import{Events}from 'src/app/DTO/MODELS/events';
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  myForm: FormGroup;
  ArreventsKind:EventsKind[]=[];
  constructor(private fb:FormBuilder,private EventService:EventsService) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      Title:["",[Validators.required]],
      date:["",[Validators.required]],
      address:["",[Validators.required]],
      city:["",[Validators.required]],
      description:["",[Validators.required]],
      comment:["",[]],
      eventsKind:["",[Validators.required]]
    })
    this.EventService.GetAllEventsKind().subscribe(x => {
      this.ArreventsKind = x;
    });;
  }
  DairyOrFleshy()
  {
    
  }
  Repeat()
  {

  }
  onSubmit(){
    let x = this.myForm.value;
    // let event:Events=new Events(0,x.value.address,x.value.city,x.value.date,x.value.description,0,x.value.comment,true,0,0,x.value.eventsKind,x.value.Title)
    console.log(x)
  }
}

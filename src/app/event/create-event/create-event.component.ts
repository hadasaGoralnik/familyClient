import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { EventsKind } from 'src/app/DTO/MODELS/events-kind';
import { EventsService } from 'src/app/services/events.service';
import{Events}from 'src/app/DTO/MODELS/events';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
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
    let event:Events=new Events(0,x.address,x.city,x.date,x.description,0,x.comment,true,0,0,x.eventsKind,x.Title)
    console.log(x)
    // this.EventService.push(event);
  }
}

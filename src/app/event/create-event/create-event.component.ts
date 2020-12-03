import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { EventsKind } from 'src/app/DTO/MODELS/events-kind';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/DTO/MODELS/events';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  myForm: FormGroup;
  ArreventsKind: EventsKind[] = [];
  isRepeat = 1;
  isDairy = true;
  constructor(private fb: FormBuilder, private EventService: EventsService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      Title: ["", [Validators.required]],
      date: ["", [Validators.required]],
      address: ["", [Validators.required]],
      city: ["", [Validators.required]],
      description: ["", [Validators.required]],
      comment: ["", []],
      eventsKind: ["", [Validators.required]]
    })
    this.EventService.GetAllEventsKind().subscribe(x => {
      this.ArreventsKind = x;
    });;
  }
  DairyOrFleshy(): void {
    if (this.isDairy)
      this.isDairy = false;
    else this.isDairy = true;
  }
  Repeat(): void {
    if (this.isRepeat)
    this.isRepeat = 0;
  else this.isRepeat = 1;
  }
  onSubmit() {
    let x = this.myForm.value;
    let event: Events = new Events(0, x.address, x.city, x.date, x.description, 0, x.comment, this.isDairy, 0, this.isRepeat, x.eventsKind, x.Title)
    console.log(event)
    // this.EventService.push(event);
  }
}

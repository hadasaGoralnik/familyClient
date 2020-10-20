import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  groupId = 1;
  events: Event[] = [];
  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.eventService.getEvents(this.groupId).subscribe(events => {
      this.events = events;

    });
  }
  // onSubmit(){
  //   // this.userService.login(x.password,x.name).subscribe(x=>{console.log(x)})
  // }
}

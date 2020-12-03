import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/DTO/MODELS/events';
import { EventsService } from '../../services/events.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  groupId = 1;
  events: Events[] = [];
  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    
    this.eventService.getEvents(this.groupId).subscribe(events => {
      this.events = events;
      // events[0].Address
    });
  }
  // onSubmit(){
  //   // this.userService.login(x.password,x.name).subscribe(x=>{console.log(x)})
  // }
}

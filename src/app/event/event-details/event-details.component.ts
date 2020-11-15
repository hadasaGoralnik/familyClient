import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { Events } from 'src/app/DTO/MODELS/events';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { Picture } from 'src/app/DTO/MODELS/picture';
import { User } from 'src/app/DTO/MODELS/user.model';
import { EventsService } from 'src/app/services/events.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  events:Events;
  picture:Picture[]=[];
  menu:Menu[]=[];
  constructor(private eventService: EventsService) {
  }

  ngOnInit(): void {
    this.eventService.GetEventById(2).subscribe(x => {
      this.events = x;
    });
    // this.eventService.GetPicturesByEventId(1).subscribe(x => {
    //   this.picture = x;
    // });
    // this.eventService.GetMenusEventId(1).subscribe(x => {
    //   this.menu = x;
    // });
  }
}

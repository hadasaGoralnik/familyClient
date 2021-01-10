import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/DTO/MODELS/events';
import { EventsService } from '../../services/events.service';
import { CreateEventModalComponent } from '../create-event-modal/create-event-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  groupId:number;
  events: Events[] = [];
  event:Events[]=[];
  eventId:number;
  constructor(private eventService: EventsService,public dialog: MatDialog,private GroupService:GroupService) { }

  ngOnInit(): void {
    this.groupId=this.GroupService.currentGroup.Id;
    this.get();
  }
  get(){
    this.eventService.getEvents(this.groupId).subscribe(events => {
      this.event = events;
      this.events=this.event.reverse();
    });
  }
  openModal() {
    const dialogRef = this.dialog.open(CreateEventModalComponent, {
      data: { eventId: this.eventId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.get();
    });
  }
}

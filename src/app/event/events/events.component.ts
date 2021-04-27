import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/DTO/MODELS/events';
import { EventsService } from '../../services/events.service';
import { CreateEventModalComponent } from '../create-event-modal/create-event-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/DTO/MODELS/user.model';
import { Group } from 'src/app/DTO/MODELS/group';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  groupId: number;
  events: Events[] = [];
  event: Events[] = [];
  eventId: number;
  event1: Events;
  currentUser: User;
  currentGroup: Group;
  constructor(private eventService: EventsService, public dialog: MatDialog, private GroupService: GroupService, private UserService: UserService) { }

  ngOnInit(): void {
    this.groupId = this.GroupService.currentGroup.Id;
    this.currentUser = this.UserService.getCurrentUser();
    this.currentGroup = this.GroupService.currentGroup;
    this.get();
  }
  get() {
    this.eventService.getEvents(this.groupId).subscribe(events => {
      this.event = events;
      this.events = this.event.reverse();
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

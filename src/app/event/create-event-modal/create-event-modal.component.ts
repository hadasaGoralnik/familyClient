import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { EventsKind } from 'src/app/DTO/MODELS/events-kind';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/DTO/MODELS/events';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from 'src/app/services/group.service';
import { User } from 'src/app/DTO/MODELS/user.model';
import { Group } from 'src/app/DTO/MODELS/group';
@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {
  myForm: FormGroup;
  ArreventsKind: EventsKind[] = [];
  isRepeat = 1;
  event: Events;
  isDairy = true;
  eventId: number;
  currentUser: User = this.UserService.getCurrentUser();
  currentGroup: Group = this.GroupService.currentGroup;
  constructor(private fb: FormBuilder, private EventService: EventsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateEventModalComponent>, private UserService: UserService, private GroupService: GroupService) { }

  ngOnInit(): void {

    if (this.data && this.data.eventId) {
      this.eventId = this.data.eventId;
      this.EventService.GetEventById(this.eventId).subscribe(x => {
        this.myForm = this.fb.group(x);
        this.event = x;
      });
    }
    this.myForm = this.fb.group({
      Title: ["", [Validators.required]],
      Date: ["", [Validators.required]],
      Address: ["", [Validators.required]],
      City: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Comment: ["", []],
      EventKindId: ["", [Validators.required]],
      Promoter: [this.currentUser.Id, [Validators.required]],
      GroupId: [this.currentGroup.Id, [Validators.required]],
      IsDairy:[true,[]],
      Repeat:["1",[]],
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
    const eventFormData = <Events>this.myForm.value;
    if (this.eventId)
      if (this.currentUser.Id == this.event.Promoter)
        this.EventService.update(eventFormData).subscribe((x) => {
          console.log(x);
        });
      else;
      else
        this.EventService.push(eventFormData).subscribe((x) => {
          console.log(x);
          this
        });
  }
}


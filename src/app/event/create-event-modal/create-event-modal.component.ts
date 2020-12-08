import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { EventsKind } from 'src/app/DTO/MODELS/events-kind';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/DTO/MODELS/events';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {

  myForm: FormGroup;
  ArreventsKind: EventsKind[] = [];
  isRepeat = 1;
  isDairy = true;
  eventId: number;
  constructor(private fb: FormBuilder, private EventService: EventsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateEventModalComponent>,) { }

  ngOnInit(): void {

    if (this.data && this.data.eventId) {
      this.eventId = this.data.eventId;
      this.EventService.GetEventById(this.eventId).subscribe(x => {
        this.myForm = this.fb.group(x);
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
      Promoter: ["", [Validators.required]],

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
 
    // this.adminService.saveBuilding(build).subscribe((x) => {
    //   alert(x);
    //   this.close();
    // });


   
   
    // this.EventService.push(event);
  }
}


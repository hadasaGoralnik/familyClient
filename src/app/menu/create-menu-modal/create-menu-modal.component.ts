import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { User } from 'src/app/DTO/MODELS/user.model';
import { EventsService } from 'src/app/services/events.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-create-menu-modal',
  templateUrl: './create-menu-modal.component.html',
  styleUrls: ['./create-menu-modal.component.css']
})
export class CreateMenuModalComponent implements OnInit {
  myForm: FormGroup;
  eventId: number=this.EventService.currentEventId;
  menuId: number;
  menu: Menu;
  currentUser: User = this.UserService.getCurrentUser();
  constructor(private fb: FormBuilder, private MenuService: MenuService, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateMenuModalComponent>, private UserService: UserService,private EventService:EventsService) { }
  ngOnInit(): void {
    if (this.data && this.data.Id) {
      this.menuId = this.data.Id;
      this.MenuService.GetMenuByMenuId(this.data.Id).subscribe(x => {
        this.myForm = this.fb.group(x);
        this.menu = x;
      });
    }
    this.myForm = this.fb.group({
      MenuOrderNumber: ["", [Validators.required]],
      Name: ["", [Validators.required]],
      Quantity: ["", [Validators.required]],
      Cost: ["", [Validators.required]],
      VolunteerId: [this.currentUser, [Validators.required]],
      EventId: [this.eventId, [Validators.required]]
    });
  }
  onSubmit() {
    const eventFormData = <Menu>this.myForm.value;
    if (this.menuId)
      if (this.currentUser.Id == this.menu.VolunteerId)
        this.MenuService.update(eventFormData).subscribe((x) => {
          console.log(x);
        });
      else;
    else
      this.MenuService.push(eventFormData).subscribe((x) => {
        alert("hhjyjyu");
        console.log(x);
      });
  }
}

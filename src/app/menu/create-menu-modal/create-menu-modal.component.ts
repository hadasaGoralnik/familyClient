import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { MenuOrderNUmber } from 'src/app/DTO/MODELS/menu-order-number';
import { User } from 'src/app/DTO/MODELS/user.model';
import { EventsService } from 'src/app/services/events.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-menu-modal',
  templateUrl: './create-menu-modal.component.html',
  styleUrls: ['./create-menu-modal.component.css']
})
export class CreateMenuModalComponent implements OnInit {
  myForm: FormGroup;
  eventId: number = this.EventService.currentEventId;
  menuId: number;
  menu: Menu;
  currentUser: User;
  ArrMenu: MenuOrderNUmber[] = [];

  constructor(private fb: FormBuilder, private MenuService: MenuService, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateMenuModalComponent>, private UserService: UserService, private EventService: EventsService) { }
  ngOnInit(): void {
    this.currentUser = this.UserService.getCurrentUser();
    this.ArrMenu.push(new MenuOrderNUmber(1, "Appetizer"));
    this.ArrMenu.push(new MenuOrderNUmber(2, "SecondDish"));
    this.ArrMenu.push(new MenuOrderNUmber(3, "SideDish"));
    this.ArrMenu.push(new MenuOrderNUmber(4, "MainDish"));
    this.ArrMenu.push(new MenuOrderNUmber(5, "Desserts"));
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
      EventId: [this.eventId, [Validators.required]]
    });
  }
  onSubmit() {
    const eventFormData = <Menu>this.myForm.value;
    if (this.menuId) {
      if (this.currentUser.Id == this.menu.VolunteerId) {
        this.MenuService.update(eventFormData).subscribe((x) => {
          if (x) {
            Swal.fire('Success', 'the menu was saved sucessfully', 'success')
          }
        }, (err => {
          Swal.fire('Opss...', '):Something went Worng', 'error');
        }));
      }
      else
        Swal.fire('Worng', 'you have no access permission', 'warning');
    }
    else {
      eventFormData.VolunteerId = this.currentUser.Id;
      this.MenuService.push(eventFormData).subscribe((x) => {
        if (x) {
          Swal.fire('Success', 'the menu was saved sucessfully', 'success')
        }

      }, (err => {
        Swal.fire('Opss...', '):Something went Worng', 'error');
      }));
    }
  }
}

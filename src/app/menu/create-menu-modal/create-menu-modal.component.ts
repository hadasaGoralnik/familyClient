import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-create-menu-modal',
  templateUrl: './create-menu-modal.component.html',
  styleUrls: ['./create-menu-modal.component.css']
})
export class CreateMenuModalComponent implements OnInit {
  myForm: FormGroup;
  eventId: number;
  menuId:number;
  constructor(private fb:FormBuilder,private MenuService:MenuService, @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<CreateMenuModalComponent>,) { }

  ngOnInit(): void {
    if (this.data && this.data.menuId) {
      this.menuId = this.data.menuId;
      this.MenuService.GetMenuByMenuId(this.menuId).subscribe(x => {
        this.myForm = this.fb.group(x);
      });
    }
    this.myForm=this.fb.group({
      MenuOrderNumber:["",[Validators.required]],
      Name:["",[Validators.required]],
      Quantity:["",[Validators.required]],
      Cost:["",[Validators.required]],
      VolunteerId:["",[Validators.required]],
    });
  }
  onSubmit(){
    const eventFormData = <Menu>this.myForm.value;
    // let x = this.myForm.value;
    // let menu:Menu=new Menu(0,x.MenuOrder,1,x.Name,1,x.Quantity,x.Cost);
    // console.log(x)
    // this.MenuService.push(menu);
  }
}

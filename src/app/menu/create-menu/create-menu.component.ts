import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb:FormBuilder,private MenuService:MenuService) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      MenuOrder:["",[Validators.required]],
      Name:["",[Validators.required]],
      Quantity:["",[Validators.required]],
      Cost:["",[Validators.required]]
    })
  }
  onSubmit(){
    let x = this.myForm.value;
    let menu:Menu=new Menu(0,x.MenuOrder,1,x.Name,1,x.Quantity,x.Cost);
    console.log(x)
    // this.MenuService.push(menu);
  }
}

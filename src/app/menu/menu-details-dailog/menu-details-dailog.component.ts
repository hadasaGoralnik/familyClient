import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-menu-details-dailog',
  templateUrl: './menu-details-dailog.component.html',
  styleUrls: ['./menu-details-dailog.component.css']
})
export class MenuDetailsDailogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MenuDetailsDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private MenuService: MenuService) { }
  menuId: number;
  menu: Menu;
  ngOnInit(): void {
    if (this.data && this.data.Id) {
      this.menuId = this.data.Id;
      this.MenuService.GetMenuByMenuId(this.data.Id).subscribe(x => {
        this.menu = x;
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/DTO/MODELS/events';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { Picture } from 'src/app/DTO/MODELS/picture';
import { User } from 'src/app/DTO/MODELS/user.model';
import { EventsService } from 'src/app/services/events.service';
import { GroupService } from 'src/app/services/group.service';
import { MenuService } from 'src/app/services/menu.service';
import { registerLocaleData } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventModalComponent } from '../create-event-modal/create-event-modal.component';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import 'hammerjs';
import { CreateMenuModalComponent } from 'src/app/menu/create-menu-modal/create-menu-modal.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  events: Events;
  imageFile: File;
  singleMenu:Menu;
  pictures: Picture[] = [];
  menu: Menu[] = [];
  Appetizer: Menu[] = [];
  SecondDish: Menu[] = [];
  SideDish: Menu[] = [];
  MainDish: Menu[] = [];
  Desserts: Menu[] = [];
  isEdit = false;
  date: Date = new Date();
  today: number;
  isRepeatEdit = 1;
  isDairy = true;
  menuId: number = 2;
  eventId: number = 2;
  constructor(private eventService: EventsService, private menuService: MenuService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEvent();
    this.getMenus();
    this.getPictures();

    this.galleryOptions = [
      {
        width: '580px',
        height: '450px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSwipe: true,
        imageAutoPlay:true,
        imageAutoPlayInterval:4500,
        imageInfinityMove:true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

  }
  getPictures() {
    this.eventService.GetPicturesByEventId(this.eventId).subscribe(x => {
      this.pictures = x;
      this.pictures.forEach(pic => {
        this.galleryImages.push({
          small: 'https://localhost:44328/Images/' + pic.Image,
          medium: 'https://localhost:44328/Images/' + pic.Image,
          big: 'https://localhost:44328/Images/' + pic.Image,
        });
      });

      //https://localhost:44328/Images/{{item.Image}}
    });
  }
  uploadFile() {
    this.eventService.uploadImage(this.imageFile, this.eventId).subscribe(x => {
      this.getPictures();
    });

  }
  onFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
    }
    this.uploadFile();
  }
  isDairyOrFleshy(): string {
    if (this.events.IsDairy == true)
      return "Dairy";
    return "Fleshy";
  }
  isRepeat(): string {
    if (this.events.Repeat)
      return "yes";
    return "false";
  }
  DairyOrFleshy(): void {
    if (this.isDairy)
      this.isDairy = false;
    else this.isDairy = true;
  }
  Repeat(): void {
    if (this.isRepeatEdit)
      this.isRepeatEdit = 0;
    else this.isRepeatEdit = 1;
  }
  getEvent() {
    this.eventService.GetEventById(this.eventId).subscribe(x => {
      this.events = x;
    });

  }
  getMenus() {
    this.menuService.GetMenusEventId(this.eventId).subscribe(x => {
      this.menu = x;
      this.menu.forEach(element => {
        switch (element.MenuOrderNumber) {
          case 1:
            this.Appetizer.push(element);
            break;
          case 2:
            this.SecondDish.push(element);
            break;
          case 3:
            this.SideDish.push(element);
            break;
          case 4:
            this.MainDish.push(element);
            break;
          case 5:
            this.Desserts.push(element);
            break;
        }
      });
    });

  }
  getSingleMenu(){
    this.menuService.GetMenuByMenuId(this.menuId).subscribe(x => {
      this.singleMenu = x;
    });
  }
  openModal() {
    const dialogRef = this.dialog.open(CreateEventModalComponent, {
      data: { eventId: this.eventId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getEvent();
    });
  }
  openModal1(menuId:number) {
    const dialogRef = this.dialog.open(CreateMenuModalComponent, {
      data: { menuId: this.menuId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getSingleMenu();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/DTO/MODELS/events';
import { Menu } from 'src/app/DTO/MODELS/menu';
import { Picture } from 'src/app/DTO/MODELS/picture';
import { User } from 'src/app/DTO/MODELS/user.model';
import { EventsService } from 'src/app/services/events.service';
import { GroupService } from 'src/app/services/group.service';
import { MenuService } from 'src/app/services/menu.service';
import{registerLocaleData }from '@angular/common';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  events: Events;
  imageFile: File;
  pictures: Picture[] = [];
  menu: Menu[] = [];
  isEdit = false;
  date:Date=new Date();
  today:number;
  isRepeatEdit= 1;
  isDairy = true;
  constructor(private eventService: EventsService, private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.eventService.GetEventById(2).subscribe(x => {
      this.events = x;
    });
  
    this.menuService.GetMenusEventId(2).subscribe(x => {
      this.menu = x;
    });
    this.getPictures();
  }
getPictures(){
  this.eventService.GetPicturesByEventId(2).subscribe(x => {
    this.pictures = x;
  });
}
  uploadFile() {
    this.eventService.uploadImage(this.imageFile, 2).subscribe(x => {
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
  isRepeat():string{
    if(this.events.Repeat)
    return "yes";
    return"false";
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
  // getDifference():number
  // {
  //   this.today=this.date.getDay()-this.events.Date.getDay();
  //   // if(this.today>=0 )
  //   return this.today;
  //   return 0;
  // }
  // edit():void
  // {

  // }
}

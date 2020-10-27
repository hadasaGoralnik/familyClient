import { Component, OnInit } from '@angular/core';
import { Group } from '../DTO/MODELS/group';
import { Subject } from 'rxjs';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.css']
})
export class DisplayGroupComponent implements OnInit {

  currentGroup:Group
  groupSubject:Subject<Group>=new Subject<Group>()

  constructor(private groupService:GroupService) {

  }

  ngOnInit(): void {
    this.currentGroup=this.groupService.currentGroup
    this.groupSubject.next(this.currentGroup)
  }

}

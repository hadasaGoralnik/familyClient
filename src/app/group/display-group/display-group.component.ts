import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Group } from 'src/app/DTO/MODELS/group';
import { User } from 'src/app/DTO/MODELS/user.model';
import { EventsService } from 'src/app/services/events.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.css']
})
export class DisplayGroupComponent implements OnInit {

  currentGroup: Group
  groupSubject: Subject<Group> = new Subject<Group>()

  constructor(private groupService: GroupService, private userService: UserService, private eventsService: EventsService) {

  }

  ngOnInit(): void {
    this.currentGroup = this.groupService.currentGroup
    this.groupSubject.next(this.currentGroup)

  }

}

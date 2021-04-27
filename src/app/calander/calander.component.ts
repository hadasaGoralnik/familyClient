import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import {
  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { EventsService } from '../services/events.service';
import { GroupService } from '../services/group.service';
import { Events } from '../DTO/MODELS/events';
import { User } from '../DTO/MODELS/user.model';
import RRule from 'rrule';
import moment from 'moment-timezone/moment-timezone';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';
import { ViewPeriod } from 'calendar-utils';
import { take } from 'rxjs/operators';
import { Group } from '../DTO/MODELS/group';
import { ICON_REGISTRY_PROVIDER_FACTORY } from '@angular/material/icon';
interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}

const colors: any = {
  pink: {
    primary: 'rgb(255 180 223)',
    secondary: 'rgb(255 180 223)',
  },
  purple: {
    primary: 'rgb(210 138 209)',
    secondary: 'rgb(210 138 209)',
  },
  blue: {
    primary: 'rgb(171 196 247)',
    secondary: 'rgb(171 196 247)',
  },

};
moment.tz.setDefault('Utc');
@Component({
  selector: 'app-calander',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent implements OnInit {
  isLoaded = false
  users: Array<User> = new Array<User>()
  birthday: Array<{ date: Date, userName: string }> = new Array<{ date: Date, userName: string }>()
  marryDate: Array<{ date: Date, userName: string }> = new Array<{ date: Date, userName: string }>()
  eventArray: Array<Events> = new Array<Events>()
  defultDate: string = '0001-01-01T00:00:00'
  view: CalendarView = CalendarView.Month;
  viewDate = moment().toDate();
  constructor(private modal: NgbModal, private eventServise: EventsService,
    private groupService: GroupService, private cdr: ChangeDetectorRef) {

  }
  currentGroup: Group;
  ngOnInit(): void {
    this.currentGroup = this.groupService.currentGroup
    this.getUsers()

  }
  getUsers() {
    if (this.groupService.currentGroup) {
      this.groupService.GetUsers(this.groupService.currentGroup.Id).subscribe(users => {
        this.users = users
        console.log("???", this.users, users)
        this.GetEventByGRoup()

        console.log(this.marryDate)
        this.refreshView()
      })
    }
  }
  refreshView(): void {

    this.refresh.next();
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  CalendarView = CalendarView;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  viewPeriod: ViewPeriod;
  recurringEvents: RecurringEvent[] = [

  ];

  activeDayIsOpen: boolean = true;
  pushEvents() {
    this.eventArray?.forEach(evt => {
      this.events = [
        ...this.events,
        {
          title: evt.Title,
          start: startOfDay(new Date(evt.Date)),
          color: colors.purple

        },
      ];

    }
    )
  }
  pushBirthdayMarryDate() {



    console.log("the events", this.events)
    this.birthday.forEach(birth => {

      if (birth.date.toString() != this.defultDate) {
        this.recurringEvents = [
          ...this.recurringEvents,

          {
            title: 'Happy birthday to ' + birth.userName + '🎈',
            color: colors.pink,
            rrule: {
              freq: RRule.YEARLY,
              bymonth: new Date(birth.date).getMonth() + 1,
              bymonthday: new Date(birth.date).getDate() - 1,
            },
          },
        ];
      }

    })
    this.marryDate.forEach(marry => {
      if (marry.date.toString() != this.defultDate) {
        this.recurringEvents = [
          ...this.recurringEvents,
          {
            title: 'Happy marry-date to ' + marry.userName + '💍',
            color: colors.blue,
            rrule: {
              freq: RRule.YEARLY,
              bymonth: new Date(marry.date).getMonth() + 1,
              bymonthday: new Date(marry.date).getDate() - 1,
            },
          }
        ];
      }

      console.log("date!!!", marry.date.toString()
      )
    })
    console.log("============>>>", this.recurringEvents)
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  GetBrithday() {
    console.log("this.users", this.users)
    this.users?.forEach(user => {
      if (user.Birthday) {
        this.birthday.push({ date: user.Birthday, userName: user.UserName })
      }

    });
  }
  GetmarryDate() {
    this.users?.forEach(user => {
      if (user.MarryDate) {
        this.marryDate.push({ date: user.MarryDate, userName: user.UserName })
      }

    });
  }
  GetEventByGRoup() {
    this.eventServise.getEvents(this.groupService.currentGroup.Id).pipe(take(1)).subscribe(res => {
      this.eventArray = res
      console.log("before", this.eventArray)

      this.GetmarryDate()
      this.GetBrithday()
      this.pushBirthdayMarryDate()
      this.isLoaded = true
    }

    )
  }




  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent

  ): void {
    viewRender.body.forEach(d => {
      d.cssClass = 'bg-pink';
    });
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.events = [];
      this.pushEvents()
      this.recurringEvents.forEach((event) => {
        console.log("!!!!", event)
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(viewRender.period.start).startOf('day').toDate(),
          until: moment(viewRender.period.end).endOf('day').toDate(),
        });
        const { title, color } = event;

        rule.all().forEach((date) => {
          this.events.push({
            title,
            color,
            start: moment(date).toDate(),
          });
        });
      });
      this.cdr.detectChanges();

    }

  }

}

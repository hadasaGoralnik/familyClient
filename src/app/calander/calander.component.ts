import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit, ChangeDetectorRef} from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,
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
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { ViewPeriod } from 'calendar-utils';
import { take } from 'rxjs/operators';
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
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
moment.tz.setDefault('Utc');
@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent implements OnInit{
  isLoaded=false
  users:Array<User>=new Array<User>()
  birthday:Array<{date:Date, userName:string}>=new Array<{date:Date, userName:string}>()
  marryDate:Array<{date:Date, userName:string}>=new Array<{date:Date, userName:string}>()
  eventArray:Array<Events>=new Array<Events>()
  defultDate:string='0001-01-01T00:00:00'
  constructor(private modal: NgbModal, private eventServise:EventsService,private groupService:GroupService,private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
  
   
    this.GetEventByGRoup()
    
    console.log(this.marryDate)
    this.refreshView()
  }
  refreshView(): void {

    this.refresh.next();
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;



  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

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

    {
      title: 'Recurs yearly on the 10th of the current month',
      color: colors.blue,
      rrule: {
        freq: RRule.YEARLY,
        bymonth: moment().month() + 1,
        bymonthday: 10,
      },
    },

  ];

  activeDayIsOpen: boolean = true;

pushEvents(){


  this.eventArray?.forEach(evt=>
    {
      this.events = [
        ...this.events,
        {
          title: evt.Title,
          start: startOfDay(new Date(evt.Date)),
          color: colors.blue

        },
      ];
 
    }
    )
    console.log("the events",this.events)
    this.birthday.forEach(birth=>{
    
      if(birth.date.toString()!=this.defultDate){
        this.recurringEvents = [
          ...this.recurringEvents,
       
          {
            title: 'Happy birthday to '+birth.userName,
            color: colors.blue,
            rrule: {
              freq: RRule.YEARLY,
              bymonth:new Date(birth.date).getMonth()+1,
              bymonthday: new Date(birth.date).getDay(),
            },
          },
        ];
      }
   

    })
    this.marryDate.forEach(marry=>{
      if(marry.date.toString()!=this.defultDate){
        this.recurringEvents = [
          ...this.recurringEvents,
          {
            title: 'Happy marry-date to '+marry.userName,
            color: colors.blue,
            rrule: {
              freq: RRule.YEARLY,
              bymonth:new Date(marry.date).getMonth()+1,
              bymonthday: new Date(marry.date).getDay(),
            },
          }
        ];
      }
    
  console.log("date!!!",marry.date.toString()
  )
    })
    console.log("============>>>",this.recurringEvents)
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

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  GetBrithday()
  {this.users?.forEach(user => {
    if(user.Birthday){
      this.birthday.push({date:user.Birthday,userName:user.UserName})
    }
   
  });
  }
  GetmarryDate()
  {this.users?.forEach(user => {
    if(user.MarryDate){
      this.marryDate.push({date:user.MarryDate,userName:user.UserName})
    }

  });
}
  GetEventByGRoup(){
    this.eventServise.getEvents(this.groupService.currentGroup.Id).pipe(take(1)).subscribe(res=>{
      this.eventArray=res
      console.log("before", this.eventArray)
      this.users=this.groupService.users
      this.GetmarryDate()
      this.GetBrithday()
      // this.pushEvents()
      this.isLoaded=true
    }
     
    )
  }

  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      // this.events = [];
      
      this.recurringEvents.forEach((event) => {
        console.log("!!!!",event)
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

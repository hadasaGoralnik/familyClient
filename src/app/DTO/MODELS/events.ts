import { title } from 'process';
import { repeat } from 'rxjs/operators';
import { ChatMessage } from './chat-message';
import { EventsKind } from './events-kind';
import { Group } from './group';
import { Menu } from './menu';
import { Messages } from './messages';
import { Picture } from './picture';
import { User } from './user.model';

export class Events {
    Id: number;
    Address: string;
    City: string;
    Date: Date;
    Description: string;
    Promoter: number;
    Comment: string;
    IsDairy: boolean;
    GroupId: number;
    Repeat: number;
    EventKindId: number;
    Title:string;
    EventsKind:EventsKind;
    Groups:Group; 
    User:User;
    constructor( Id?: number,
        Address?: string,
        City?: string,
        Date?: Date,
        Description?: string,
        Promoter?: number,
        Comment?: string,
        IsDairy?: boolean,
        GroupId?: number,
        Repeat?: number,
        EventKindId?: number,
        Title?:string,)
        {
            this.City=City;
            this.Comment=Comment;
            this.Date=Date;
            this.Description=Description;
            this.EventKindId=EventKindId;
            this.GroupId=GroupId;
            this.IsDairy=IsDairy;
            this.Promoter=Promoter;
            this.Repeat=Repeat;
            this.Title=Title;
        }
}

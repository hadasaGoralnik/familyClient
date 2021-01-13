import { from } from 'rxjs';
import { User } from './user.model';
import{ChatMessage}from'./chat-message';
export class Group {
    Id: number;
    Name: string;
    Events: Event[];
    User1: User[];
    Image:string;
    ChatMessages:ChatMessage[];
}
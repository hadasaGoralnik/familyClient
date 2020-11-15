import { ChatMessage } from './chat-message';
import { Group } from './group';
import { Menu } from './menu';
import { Messages } from './messages';

export class User {
    Id: number;
    UserName: string;
    Birthday: Date;
    MarryDate: Date;
    Mail: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Image: string;
    Password: string;
    ChatMessages: ChatMessage[];
    Events: Event[];
    Groups: Group[];
    Menu: Menu[];
    Message: Messages[];
    Groups1: Group[];
    IsMale:boolean;
}
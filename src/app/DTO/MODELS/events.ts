import { ChatMessage } from './chat-message';
import { Menu } from './menu';
import { Messages } from './messages';
import { Picture } from './picture';

export class Events {
    Id: number;
    Adress: string;
    City: string;
    Date: Date;
    Description: string;
    Promoter: number;
    Comment: string;
    IsDairy: number;
    GroupId: number;
    Repeat: number;
    EventKindId: number;
    ChatMessages: ChatMessage[];
    Menu: Menu[];
    Message: Messages[];
    Picture: Picture[];

}

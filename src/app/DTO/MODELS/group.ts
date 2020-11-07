import { User } from './user.model';

export class Group {
    Id: number;
    Name: string;
    Events: Event[];
    User1: User[];
}

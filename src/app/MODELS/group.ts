import { User } from './user.model';

export class Group {
    Id: number;
    Name: string;
    ManagerId: number;
    Events: Event[];
    User1: User[];
}

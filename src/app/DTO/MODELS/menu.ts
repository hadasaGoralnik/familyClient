import { every } from 'rxjs/operators';
import { User } from './user.model';

export class Menu {
    Id: number;
    MenuOrderNumber: number;
    VolunteerId: number;
    Name: string;
    EventId: number;
    Quantity: number;
    Cost: number;
    User:User;
    constructor(Id: number,
        MenuOrderNumber: number,
        VolunteerId: number,
        Name: string,
        EventId: number,
        Quantity: number,
        Cost: number,User:User) {
        this.Cost = Cost;
        this.EventId = EventId;
        this.Id = Id;
        this.MenuOrderNumber = MenuOrderNumber;
        this.Name = Name;
        this.Quantity = Quantity;
        this.VolunteerId = VolunteerId;
        this.User=User;
    }
}

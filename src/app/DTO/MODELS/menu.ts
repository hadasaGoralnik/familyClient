import { every } from 'rxjs/operators';

export class Menu {
    Id: number;
    MenuOrderNumber: number;
    VolunteerId: number;
    Name: string;
    EventId: number;
    Quantity: number;
    Cost: number;
    constructor(Id: number,
        MenuOrderNumber: number,
        VolunteerId: number,
        Name: string,
        EventId: number,
        Quantity: number,
        Cost: number) {
        this.Cost = Cost;
        this.EventId = EventId;
        this.Id = Id;
        this.MenuOrderNumber = MenuOrderNumber;
        this.Name = name;
        this.Quantity = Quantity;
        this.VolunteerId = VolunteerId;
    }
}

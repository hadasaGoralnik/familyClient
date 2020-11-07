import { User } from '../MODELS/user.model';

export class UpdateUserRequest {
    Id:number;
    UserName: string;
    Birthday: Date;
    MarryDate: Date;
    Mail: string;
    FirstName: string;
    LastName: string;
    Address: string;
    IsMale: boolean;
    Image: string;
    Password: string;
}

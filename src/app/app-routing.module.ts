import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './event/events/events.component';
import { LoginComponent } from './user/login/login.component';
import { SighUpComponent } from './user/sigh-up/sigh-up.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { DisplayGroupComponent } from './group/display-group/display-group.component';
import { AddUeserToGroupRequest } from './DTO/Requests/add-ueser-to-group-request';
import { AddUserToGroupComponent } from './group/add-user-to-group/add-user-to-group.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DisplayUserComponent } from './user/display-user/display-user.component';
import { HomeComponent } from './home/home.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SighUpComponent},
  {path:'group-list',component:GroupListComponent},
  {path:'add-group',component:AddGroupComponent},
  {path:'display-group',component:DisplayGroupComponent},
  {path:'add-user',component:AddUserToGroupComponent},
  {path:'update-user',component:UpdateUserComponent},
  {path:'display-user',component:DisplayUserComponent},
  {path:'event/:id',component:EventDetailsComponent},
  {path:'events',component:EventsComponent,pathMatch: "full"
},
  {path:'',component:HomeComponent}
 ];
 
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

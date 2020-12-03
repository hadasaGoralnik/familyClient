import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { HelpComponent } from './help/help.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, Validator } from '@angular/forms';
import { MatrialModule } from './matrial/matrial.module';
import { SighUpComponent } from './user/sigh-up/sigh-up.component';
import { EventsComponent } from './event/events/events.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { DisplayGroupComponent } from './group/display-group/display-group.component';
import { UserListOfGroupComponent } from './group/user-list-of-group/user-list-of-group.component';
import { AddUserToGroupComponent } from './group/add-user-to-group/add-user-to-group.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DisplayUserComponent } from './user/display-user/display-user.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { CreateMenuComponent } from './menu/create-menu/create-menu.component';
import { UpdateMenuComponent } from './menu/update-menu/update-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
    SighUpComponent,
    EventsComponent,
    NavbarComponent,
    GroupListComponent,
    AddGroupComponent,
    DisplayGroupComponent,
    UserListOfGroupComponent,
    EventDetailsComponent,
    AddUserToGroupComponent,
    UpdateUserComponent,
    DisplayUserComponent,
    HomeComponent,
       ChatComponent,
       CreateEventComponent,
       CreateMenuComponent,
       UpdateMenuComponent
  ],
  imports: [
    MatrialModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

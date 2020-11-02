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
import { CreateContactComponent } from './user/create-contact/create-contact.component';
import { MatrialModule } from './matrial/matrial.module';
import { CardComponent } from './user/card/card.component';
import { SighUpComponent } from './user/sigh-up/sigh-up.component';
import { EventsComponent } from './event/events/events.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { DisplayGroupComponent } from './display-group/display-group.component';
import { UserListOfGroupComponent } from './user-list-of-group/user-list-of-group.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
    CreateContactComponent,
    CardComponent,
    SighUpComponent,
    EventsComponent,
    NavbarComponent,
    GroupListComponent,
    AddGroupComponent,
    DisplayGroupComponent,
    UserListOfGroupComponent,
    EventDetailsComponent,
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './event/events/events.component';
import { LoginComponent } from './user/login/login.component';
import { SighUpComponent } from './user/sigh-up/sigh-up.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SighUpComponent},
  {path:'events',component:EventsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

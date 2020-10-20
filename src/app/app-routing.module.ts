import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './event/events/events.component';
import { LoginComponent } from './user/login/login.component';


const routes: Routes = [
  {path:'home',component:LoginComponent},
  {path:'events',component:EventsComponent},
{ path: '', pathMatch: 'full', redirectTo: '/home' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

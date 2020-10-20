import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'family';
constructor(private http:HttpClient){}
  submit(){
    console.log('submit');
// this.http.get("https://localhost:44328/api/user").subscribe(x=>{console.log(x)})
// this.http.get(`https://localhost:44328/api/user?id=${this.title}`).subscribe(x=>{console.log(x)})
// this.http.post("https://localhost:44328/api/user",this.data).subscribe(x=>{console.log(x)})
}
}

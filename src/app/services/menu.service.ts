import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../DTO/MODELS/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public http: HttpClient) { }
  push(menu:Menu):Observable<Menu> 
  {
    return this.http.post<Menu>('http://localhost:44328/api/menu/CreateMenu',menu);
  }
  GetMenusEventId(id:number): Observable<Menu[]>{
    return this.http.get<Menu[]>(`https://localhost:44328/api/menu/GetMenusByEventId/${id}`);
  }
  GetMenuByMenuId(id:number) :Observable<Menu>{
    return this.http.get<Menu>(`https://localhost:44328/api/menu/GetMenuByMenuId/${id}`)
  }
  update(menu:Menu):Observable<Menu> 
  {
    return this.http.put<Menu>('http://localhost:44328/api/menu/UpdateMenu',menu);
  }
}

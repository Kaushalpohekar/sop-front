import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  
  constructor(private http: HttpClient, private router: Router) {}
  //private readonly API_URL = 'http://ec2-13-233-104-82.ap-south-1.compute.amazonaws.com:3000';
  private readonly API_URL = 'http://localhost:3000';

  public showMenu = false;
  public pageLoading = true;
  public dataLoading = true;
  
  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  public isDataLoading() {
    this.dataLoading = !this.dataLoading;
  }

  public isPageLoading(isLoading: boolean) {
    this.pageLoading = isLoading;
  }
  getScreenDetails(): Observable<any> {
    return this.http.get(`${this.API_URL}/getAllScreens`);
  }
  addScreen(ScreenName: any): Observable<any> {
    return this.http.post(`${this.API_URL}/addScreen`, ScreenName);
  }
  deleteScreen(ScreenID:string): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteScreen/${ScreenID}`);
  }


}

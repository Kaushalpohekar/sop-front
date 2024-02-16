import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private http: HttpClient, private router: Router) {}
  //private readonly API_URL = 'http://ec2-13-233-104-82.ap-south-1.compute.amazonaws.com:3000';
  private readonly API_URL = 'http://localhost:3000';

  getScreenDetails(): Observable<any> {
    return this.http.get(`${this.API_URL}/getAllScreens`);
  }
  
  getScreenDisplay(ScreenID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/getSOPDataByScreenId/${ScreenID}`);
  }
}

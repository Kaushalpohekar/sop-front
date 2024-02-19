import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private http: HttpClient, private router: Router) {}
  private readonly API_URL = 'http://192.168.227.87:3000';

  getScreenDetails(): Observable<any> {
    return this.http.get(`${this.API_URL}/getAllScreens`);
  }
  
  getScreenDisplay(ScreenID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/getSOPDataByScreenId/${ScreenID}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  
  constructor(private http: HttpClient, private router: Router) {}
  private readonly API_URL = 'http://192.168.0.158:4000';
  // private readonly API_URL = 'http://localhost:4000';

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
  sendImageData(imageData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/InsertSOPData`, imageData);
  }
  sendSOPData(sopData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/InsertSOPData`, sopData);
  }
  
  editScreen(element: any, ScreenData: any): Observable<any> {
    const screenId = element.ScreenID;
    return this.http.put(`${this.API_URL}/updateScreen/${screenId}`, ScreenData);
  }

  getScreenDisplay(ScreenID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/getSOPDataByScreenId/${ScreenID}`);
  }

  deleteSOPData(FileName: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteSOPData/${FileName}`);
  }
  
  getTextData(screenId: number) {
    return this.http.get(`${this.API_URL}/getAllTextData/${screenId}`);
  }

  InsertSOPTextData(data: any) {
    return this.http.post(`${this.API_URL}/InsertSOPTextData`, data);
  }

  UpdateSOPTextData(data: any) {
    return this.http.put(`${this.API_URL}/UpdateSOPTextData`, data);
  }

  InsertSOPTextContentData(data: any){
    return this.http.post(`${this.API_URL}/InsertSOPTextContentData`, data)
  }

  UpdateSOPTextContentData(data: any){
    return this.http.put(`${this.API_URL}/UpdateSOPTextContentData`, data)
  }
}

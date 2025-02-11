import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public serverName=environment.apiUrl;
 
  constructor(private http:HttpClient){}
 
  //Register and login
  public registerUser(user:any):Observable<any>{
    console.log(this.serverName);
    console.log(user);
    return this.http.post<any>(`${this.serverName}/api/user/register`,user);
  }
 
  public Login(user:any):Observable<any>{
    return this.http.post<any>(`${this.serverName}/api/user/login`,user);
  }
 
 
  //Event
 
  public createEvent(event:any):Observable<any>{
    return this.http.post<any>(`${this.serverName}/api/planner/event`,event);
  }
 
  public GetAllevents():Observable<any[]>{
    return this.http.get<any[]>(this.serverName+"/api/planner/events");
  }
 
  public addResource(resource:any):Observable<any>{
    return this.http.post<any>(this.serverName+"/api/planner/resource",resource);
  }
 
  public GetAllResources():Observable<any[]>{
    return this.http.get<any[]>(this.serverName+"/api/planner/resources");
  }
 
  public allocateResources(eventId:any,resourceId:any,allocation:any):Observable<any>{
    return this.http.post<any>(`${this.serverName}/api/planner/allocate-resources?eventID=${eventId}?resourceID=${resourceId}`,allocation);
  }
 
  //client
 
  public getBookingDetails(eventId:any):Observable<any>{
    return this.http.get<any>(`${this.serverName}/api/client/booking-details/${eventId}`);
  }
 
 
  //staff
 
  public GetEventdetails(eventId:any):Observable<any>{
    return this.http.get<any>(`${this.serverName}/api/staff/event-details/${eventId}`)
  }
 
 
  public updateEvent(eventId:any,updateEvent:any){
    return this.http.post<any>(`${this.serverName}/api/staff/update-setup/${eventId}`,updateEvent);
  }
 
}
 
 
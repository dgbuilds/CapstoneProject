import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public serverName = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Register and login
  public registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/user/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public Login(user: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/user/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/user/clients`, {
      headers: this.getHeaders()
    });
  }

  // Event
  public createEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/planner/event`, event, {
      headers: this.getHeaders()
    });
  }

  public GetAllevents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/planner/events`, {
      headers: this.getHeaders()
    });
  }

  public addResource(resource: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/planner/resource`, resource, {
      headers: this.getHeaders()
    });
  }

  public GetAllResources(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/planner/resources`, {
      headers: this.getHeaders()
    });
  }

  public allocateResources(eventId: any, resourceId: any, allocation: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/planner/allocate-resources?eventId=${eventId}&resourceId=${resourceId}`, allocation, {
      headers: this.getHeaders()
    });
  }

  // Client
  public getBookingDetails(eventId: any): Observable<any> {
    return this.http.get<any>(`${this.serverName}/api/client/booking-details/${eventId}`, {
      headers: this.getHeaders()
    });
  }

  public getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/bookings`, {
      headers: this.getHeaders()
    });
  }

  // Staff
  public GetEventdetails(eventId: any): Observable<any> {
    return this.http.get<any>(`${this.serverName}/api/staff/event-details/${eventId}`, {
      headers: this.getHeaders()
    });
  }

  public updateEvent(eventId: any, updateEvent: any): Observable<any> {
    return this.http.put<any>(`${this.serverName}/api/staff/update-setup/${eventId}`, updateEvent, {
      headers: this.getHeaders()
    });
  }

  public getRequests(status: any): Observable<any> {
    return this.http.get<any>(`${this.serverName}/api/booking?status=${status}`, {
      headers: this.getHeaders()
    });
  }

  public handleRequest(bookingId: any, action: any): Observable<any> {
    return this.http.put<any>(`${this.serverName}/api/booking/update/${bookingId}`, action, {
      headers: this.getHeaders()
    });
  }

  public createBooking(value: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/bookings`, value, {
      headers: this.getHeaders()
    });
  }
}
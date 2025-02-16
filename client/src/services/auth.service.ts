import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  setUserID(userId:any):void{
    localStorage.setItem('userId',userId);
  }

  getUserID():any{
    console.log("getuserIdcalled");
    console.log(localStorage.getItem('userId'));
    return localStorage.getItem('userId');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // getLoginStatus(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { decodeUsername, decodeExp } from '../../jwt/tokens';
import { User } from '../../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.apiUrl + '/auth';
  private user: User ;  

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  login(authData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth`, authData, { observe: 'response' });
  }

   setAuthToken(token: string): void {
    localStorage.setItem("token", token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem("token");
  }

  /*
  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['/auth/login']);
  }
  */

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUserId() {
    return this.user.id;
  }

/*
  getUsername(){
    return decodeUsername(localStorage.getItem("token"));
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken();
    if (!token) {
      return false; // Token doesn't exist
    }
    const decodedToken = decodeExp(token);
    if (!decodedToken) {
      return false; // Token couldn't be decoded
    }
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return currentTime < decodedToken;
  }
  */
  requestPasswordReset(email: string): Observable<any> {
    const body = { email };
    return this.http.post<any>(`${this.baseUrl}/forget-pwd`, body);
  }

  logout(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, { refreshToken });
    this.router.navigate(['/auth/login']);
  }
  
}

  
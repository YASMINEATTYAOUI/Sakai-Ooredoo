import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { decodeUsername, decodeExp } from '../../jwt/tokens';
import { UserDto } from '../../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.apiUrl + '/auth';
  private user: UserDto ;  

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  register(registrationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/dashboard/users`, registrationData, { observe: 'response' });
  }

  login(authData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth`, authData, { observe: 'response' });
  }

   setAuthToken(token: string): void {
    localStorage.setItem("token", token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem("token");
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['/auth/login']);
  }

  setUser(user: UserDto) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUserId() {
    return this.user.id;
  }

  loadUser() {
    if (this.user == null) {
      let username = decodeUsername(this.getAuthToken);
      this.userService.getUserByUsername(username).subscribe({
        next : (response  : UserDto) => {
          // Use 'response' directly as it's of type UserDto
          console.log(response.id); // Now id is accessible as a number
          return this.user = response; // Assuming you want to store the UserDto object
        },
        error: (error) => {
          console.error('Error fetching user:', error); // Optionally display an error message to the user
          return null;
        },
        complete: () => { return this.user}
      })
    }
  }

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
  
  requestPasswordReset(email: string): Observable<any> {
    const body = { email };
    return this.http.post<any>(`${this.baseUrl}/forget-pwd`, body);
  }

  
}
  
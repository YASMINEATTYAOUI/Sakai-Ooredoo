import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
//import jwtDecode from 'jwt-decode'; // Ensure to import correctly
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.apiUrl + '/auth';

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() { }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, user)
      .pipe(
        tap((tokens: any) =>
          this.doLoginUser(user.email, JSON.stringify(tokens))
        )
      );
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /*
  getCurrentAuthUser() {
    return this.http.get(`${this.baseUrl}`);
  }
*/
  getCurrentAuthUser() {
    const token = this.getJwtToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken;  // Return decoded token containing user details
    }
    return null;
  }

  private getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  
  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }
  /*
    isTokenExpired() {
      const tokens = localStorage.getItem(this.JWT_TOKEN);
      if (!tokens) return true;
      const token = JSON.parse(tokens).access_token;
      const decoded = jwtDecode(token);
      if (!decoded.exp) return true;
      const expirationDate = decoded.exp * 1000;
      const now = new Date().getTime();
  
      return expirationDate < now;
    }
  */
  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return null;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.http
      .post<any>(`${this.baseUrl}/refresh-token`, {
        refreshToken,
      })
      .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }

}
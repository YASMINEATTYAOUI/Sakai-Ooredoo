// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';
// //import jwtDecode from 'jwt-decode'; // Ensure to import correctly
// //import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { User } from '../../models/user';
// import { catchError, tap } from 'rxjs/operators';
// import { BehaviorSubject, Observable, of } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   private baseUrl = environment.apiUrl + '/auth';

//   currentUser: User;

//   private readonly JWT_TOKEN = 'JWT_TOKEN';
//   private loggedUser?: string;
//   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//   private router = inject(Router);
//   private http = inject(HttpClient);

//   constructor() {
//     this.loadCurrentUser();
//    }

//    private loadCurrentUser() {
//     const token = this.getJwtToken();
//     if (token) {
//       this.getCurrentUser().subscribe();
//     }
//   }


//   login(user: { email: string; password: string }): Observable<any> {
//     return this.http
//       .post(`${this.baseUrl}/login`, user)
//       .pipe(
//         tap((tokens: any) =>
//           this.doLoginUser(user.email, JSON.stringify(tokens))
//         )
//       );
//   }

//   private doLoginUser(email: string, token: any) {
//     this.loggedUser = email;
//     this.storeJwtToken(token);
//     this.isAuthenticatedSubject.next(true);
//   }

//   private storeJwtToken(jwt: string) {
//     localStorage.setItem(this.JWT_TOKEN, jwt);
//   }

//   logout() {
//     localStorage.removeItem(this.JWT_TOKEN);
//     this.isAuthenticatedSubject.next(false);
//     this.router.navigate(['/login']);
//   }

//   // getCurrentUser() {
//   //   return this.http.get<any>(`${this.baseUrl}/current-user`) .pipe(tap(user => this.currentUser = user));
//   // }


//   getCurrentUser(): Observable<User> {
//     return this.http.get<User>(`${this.baseUrl}/current-user`)
//       .pipe(
//         tap(user => this.currentUser = user),
//         catchError(error => {
//           console.error('Failed to get current user', error);
//           return of(null); // Return observable with null value
//         })
//       );
//   }

//   // hasPrivilege(privilegeName: string): boolean {
//   //   return this.currentUser?.role.privileges.some(privilege => privilege.name === privilegeName) ;
//   // }

//   hasPrivilege(privilegeName: string): boolean {
//       console.log('currentUser:', this.currentUser);

//     return this.currentUser?.role.privileges.some(privilege => privilege.name === privilegeName) ;
//   }

//   hasActiveRole(): boolean {
//     console.log('currentUser:', this.currentUser);

//     console.log('currentUser.role.active:', this.currentUser?.role?.active);
//     return this.currentUser?.role?.active === true;
//   }

//   isActive(): boolean {
//     console.log('currentUser:', this.currentUser);

//     console.log('currentUser.status:', this.currentUser?.status);
//     return this.currentUser?.status === true;
//   }

//   getCurrentAuthUser() {
//     const token = this.getJwtToken();
//     if (token) {
//       const decodedToken: any = jwtDecode(token);
//       return decodedToken;  // Return decoded token containing user details
//     }
//     return null;
//   }

//   private getJwtToken(): string | null {
//     return localStorage.getItem(this.JWT_TOKEN);
//   }
  
//   isLoggedIn() {
//     return !!localStorage.getItem(this.JWT_TOKEN);
//   }
//   /*
//     isTokenExpired() {
//       const tokens = localStorage.getItem(this.JWT_TOKEN);
//       if (!tokens) return true;
//       const token = JSON.parse(tokens).access_token;
//       const decoded = jwtDecode(token);
//       if (!decoded.exp) return true;
//       const expirationDate = decoded.exp * 1000;
//       const now = new Date().getTime();
  
//       return expirationDate < now;
//     }
//   */
//   refreshToken() {
//     let tokens: any = localStorage.getItem(this.JWT_TOKEN);
//     if (!tokens) return null;
//     tokens = JSON.parse(tokens);
//     let refreshToken = tokens.refresh_token;
//     return this.http
//       .post<any>(`${this.baseUrl}/refresh-token`, {
//         refreshToken,
//       })
//       .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
//   }

// }


import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.apiUrl + '/auth';
  currentUser: User;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {
    // Initialize the user on service instantiation
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const token = this.getJwtToken();
    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

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
    this.getCurrentUser().subscribe(); // Load current user after login
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
    this.currentUser = undefined; // Clear current user on logout
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/current-user`)
      .pipe(
        tap(user => this.currentUser = user),
        catchError(error => {
          console.error('Failed to get current user', error);
          return of(null); // Return observable with null value
        })
      );
  }

  hasPrivilege(privilegeName: string): boolean {
    //console.log('currentUser:', this.currentUser);
    return this.currentUser?.role.privileges.some(privilege => privilege.name === privilegeName);
  }

  // hasActiveRole(): Boolean {
  //   console.log('currentUser:', this.currentUser);
  //   return this.currentUser?.role?.active ;
  // }

  // isActive(): Boolean {
  //   console.log('currentUser:', this.currentUser);
  //   return this.currentUser?.status ;
  // }

  getCurrentAuthUser() {
    const token = this.getJwtToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken; // Return decoded token containing user details
    }
    return null;
  }

  private getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  
  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return null;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.http
      .post<any>(`${this.baseUrl}/refresh-token`, { refreshToken })
      .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }
}

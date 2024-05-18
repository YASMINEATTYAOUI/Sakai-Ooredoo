import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler,HttpEvent, HttpInterceptor,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/services/authentication.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Get the JWT token from your AuthService
    const authToken = this.authService.getAuthToken();
    // Clone the request and add the Authorization header if a token exists
    if (authToken) {
      const headers = request.headers.set('Authorization', `Bearer ${authToken}`);
      request = request.clone({ headers });
    }

    // Pass the modified request to the next interceptor or handler
    return next.handle(request);
  }


}
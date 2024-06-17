import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePassword } from '../../models/change-password';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  private baseUrl = 'http://localhost:8089/api/forgot-pwd';

  constructor(private http: HttpClient) { }

  verifyEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verify-mail/${email}`, {});
  }

  verifyOtp(otp: number, email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verify-mail/${otp}/${email}`, {});
  }

  resetPassword(email: string, changePassword: ChangePassword): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-password/${email}`, changePassword);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserDto } from '../../models/user';
import { environment } from 'src/environments/environment';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  getUser(): User {
    return null;
  }
  
    private baseUrl = environment.apiUrl + '/auth';
  
    constructor(private http: HttpClient) {}
  
    createUser(user: User): Observable<object> {
      return this.http.post(`${this.baseUrl}/save`, user);
    }
  
    updateUser(userDto: UserDto): Observable<Object> {
      return this.http.put(this.baseUrl, userDto);
    }
  
    getUsers(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/users`);
    }
  
    getUserById(id: number): Observable<UserDto> {
      return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
    }
  
    getUserByUsername(username: string): Observable<User> {
      const params = new HttpParams()
        .set('username', username);
      return this.http.get<User>(`${this.baseUrl}/`, { params });
    }
  
    deleteUser(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  
    deleteUsers(ids: number[]): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete`, { params: { ids: ids.join(',') } });
    }
  
    searchUsersByKeyword(keyword: string, pageEvent: PageEvent): Observable<any> {
      const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
        .set('keyword', keyword)
        .set('page', pageNumber.toString())
        .set('size', rows.toString());
      return this.http.get<UserDto[]>(`${this.baseUrl}/search`, { params });
    }

    countUsers(): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/count`);
    }
    /*
    changePassword(changePasswordRequest: ChangePasswordRequest): Observable<void> {
      return this.http.post<void>(`${this.baseUrl}/changePassword`, changePasswordRequest);
    }
  */
    assignRole(userId: number, roleId: number): Observable<void> {
      return this.http.post<void>(`${this.baseUrl}/users/${userId}/roles/${roleId}`, {});
    }
  
    revokeRole(userId: number, roleId: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/users/${userId}/roles/${roleId}`);
    }
  }
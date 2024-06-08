import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Privilege } from '../../models/privilege';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

private baseUrl = environment.apiUrl + '/privileges';

  constructor(private http: HttpClient) {}


  getServiceUrl() {
    return this.baseUrl;
  }

  createPrivilege( privilege: Privilege): Observable<void> {
    return this.http.post<void>(this.baseUrl, privilege);
  }

  togglePrivilegeStatus(privilegeId: number): Observable<Privilege> {
    return this.http.put<Privilege>(`${this.baseUrl}/${privilegeId}/toggle`, {});
  }

  getPrivileges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sorted`);
  }

  getPrivilegeById(id: string): Observable<Privilege> {
    return this.http.get<Privilege>(`${this.baseUrl}/${id}`);
  }

  searchPrivilegesByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows??10;
    const pageNumber = pageEvent.first??0 / rows;
    const params = new HttpParams()
      .set('name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<Privilege[]>(`${this.baseUrl}/search`, { params });
  }
  countPrivileges(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
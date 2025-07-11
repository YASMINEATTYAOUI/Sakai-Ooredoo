import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../../models/role';
import { PageEvent } from '../../utils/page-event';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = environment.apiUrl + '/roles';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, role);
  }


  updateRole(roleId: any, updatedRole: Role): Observable<Role> {

    return this.http.put<Role>(`${this.baseUrl}/${roleId}`, updatedRole);
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getRoleById(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }

  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteRoles(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }
  searchRolesByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<Role[]>(`${this.baseUrl}/search`, { params });
  }

  countRoles(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
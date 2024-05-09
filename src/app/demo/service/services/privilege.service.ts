import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrivilegeDto } from '../../models/privilege';
import { PageEvent } from '../../utils/page-event';
@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

private baseUrl = environment.apiUrl + '/privileges';

  constructor(private http: HttpClient) {}

  createPrivilege(privilegeDto: PrivilegeDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, privilegeDto);
  }

  updatePrivilege(privilegeDto: PrivilegeDto): Observable<PrivilegeDto> {
    return this.http.put<PrivilegeDto>(this.baseUrl, privilegeDto);
  }

  getPrivileges(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getAllPrivilegesSortedByCreatorId(creatorId : string, name : string, pageEvent: PageEvent): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if(name){
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }

  getPrivilegeById(id: string): Observable<PrivilegeDto> {
    return this.http.get<PrivilegeDto>(`${this.baseUrl}/${id}`);
  }

  deletePrivilege(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deletePrivileges(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }
  searchPrivilegesByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows??10;
    const pageNumber = pageEvent.first??0 / rows;
    const params = new HttpParams()
      .set('name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<PrivilegeDto[]>(`${this.baseUrl}/search`, { params });
  }
  countPrivileges(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
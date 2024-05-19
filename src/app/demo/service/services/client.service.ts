import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../../models/client';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.apiUrl + '/clients';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }

  updateClient(clientDto: Client): Observable<Client> {
    return this.http.put<Client>(this.baseUrl, clientDto);
  }

  getClients(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getAllClientsSortedByCreatorId(creatorId: string, name: string, pageEvent: PageEvent): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  searchClientsByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<Client[]>(`${this.baseUrl}/search`, { params });
  }

  countClients(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}

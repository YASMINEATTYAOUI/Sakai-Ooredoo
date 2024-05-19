import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../../models/color';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private baseUrl = environment.apiUrl + '/colors';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }

  createColor(color: Color): Observable<Color> {
    return this.http.post<Color>(this.baseUrl, color);
  }

  updateColor(color: Color): Observable<Color> {
    return this.http.put<Color>(this.baseUrl, color);
  }

  getColors(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getAllColorsSortedByCreatorId(creatorId: string, name: string, pageEvent: PageEvent): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }

  getColorById(id: string): Observable<Color> {
    return this.http.get<Color>(`${this.baseUrl}/${id}`);
  }

  deleteColor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteColors(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }

  searchColorsByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<Color[]>(`${this.baseUrl}/search`, { params });
  }

  countColors(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theme } from '../../models/theme';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private baseUrl = environment.apiUrl + '/themes';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }

  createTheme(theme: Theme): Observable<Theme> { 
    return this.http.post<Theme>(this.baseUrl, theme);
  }
  
  updateTheme(themeId:any, updatedTheme:Theme): Observable<Theme> {
    return this.http.put<Theme>(`${this.baseUrl}/${themeId}`, updatedTheme);
  }

  getThemes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getThemeById(id: string): Observable<Theme> {
    return this.http.get<Theme>(`${this.baseUrl}/${id}`);
  }

  deleteTheme(id: string): Observable<void> { 
    return this.http.delete<void>(`${this.baseUrl}/${id}`); 
  }

  deleteThemes(ids: string[]): Observable<any> { 
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }

  searchThemesByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<Theme[]>(`${this.baseUrl}/search`, { params });
  }

  countThemes(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`); 
  }
}

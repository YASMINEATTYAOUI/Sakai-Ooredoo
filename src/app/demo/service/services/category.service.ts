import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryDto } from '../../models/category'; // Assuming you have Category and CategoryDto defined
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }

  createCategory(categoryDto: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(this.baseUrl, categoryDto);
  }

  updateCategory(categoryDto: CategoryDto): Observable<CategoryDto> {
    return this.http.put<CategoryDto>(this.baseUrl, categoryDto);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getAllCategoriesSortedByCreatorId(creatorId: string, name: string, pageEvent: PageEvent): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }

  getCategoryById(id: string): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.baseUrl}/${id}`);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteCategories(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }

  searchCategoriesByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<CategoryDto[]>(`${this.baseUrl}/search`, { params });
  }

  countCategories(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../../models/brand';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = environment.apiUrl + '/brands';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }

  createBrand(name: string, description: string, file: File): Observable<Brand> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file, file.name);
    return this.http.post<Brand>(`${this.baseUrl}`, formData);
  }

updateBrand(brandId: number, formData: FormData): Observable<any> {
  return this.http.put(`${this.baseUrl}/${brandId}`, formData);
}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}/sorted`).pipe(
      map((brands: any[]) => {
        brands.forEach(brand => {
          if (brand.image) {
            brand.image = 'data:image/png;base64,' + brand.image;
          }
        });
        return brands;

      })
    );
  }

  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/${id}`);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteBrands(ids: number[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }

  searchBrandsByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<Brand[]>(`${this.baseUrl}/search`, { params });
  }

  countBrands(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}

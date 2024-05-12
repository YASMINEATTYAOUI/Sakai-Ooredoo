import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand, BrandDto } from '../../models/brand';
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

  saveBrand(file: File, name: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('name', name);
    return this.http.post(this.baseUrl, formData);
  }


  createBrand(brandDto: BrandDto): Observable<BrandDto> {
    return this.http.post<BrandDto>(this.baseUrl, brandDto);
  }

  updateBrand(brandDto: BrandDto): Observable<BrandDto> {
    return this.http.put<BrandDto>(this.baseUrl, brandDto);
  }

  getBrands(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getAllBrandsSortedByCreatorId(creatorId: string, name: string, pageEvent: PageEvent): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }

  getBrandById(id: string): Observable<BrandDto> {
    return this.http.get<BrandDto>(`${this.baseUrl}/${id}`);
  }

  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteBrands(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }

  searchBrandsByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<BrandDto[]>(`${this.baseUrl}/search`, { params });
  }

  countBrands(): Observable<number> { // Updated method name
    return this.http.get<number>(`${this.baseUrl}/count`); // Updated baseUrl and method name
  }
}

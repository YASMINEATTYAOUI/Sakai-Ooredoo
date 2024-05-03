import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PackageDto } from '../../models/package';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl = environment.apiUrl + '/package';

  constructor(private http: HttpClient) {}

  createPackage(packageDto: PackageDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, packageDto);
  }

  updatePackage(packageDto: PackageDto): Observable<PackageDto> {
    return this.http.put<PackageDto>(this.baseUrl, packageDto);
  }

  getPackages(pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows ?? 10 ;
    const pageNumber = pageEvent.first ?? 0 / rows;
    const params = { page: pageNumber.toString(), size: rows.toString() };
    return this.http.get<any>(`${this.baseUrl}/sorted`, { params });
  }
/*
  getAllPackagesSortedByCreatorId(creatorId : string, reference : string, pageEvent: Page): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if(name){
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }
*/
  getPackageById(id: string): Observable<PackageDto> {
    return this.http.get<PackageDto>(`${this.baseUrl}/${id}`);
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deletePackages(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }
  searchPackagesByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows??10;
    const pageNumber = pageEvent.first??0 / rows;
    const params = new HttpParams()
      .set('name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<PackageDto[]>(`${this.baseUrl}/search`, { params });
  }
  countPackages(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
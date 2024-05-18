import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Package } from '../../models/package';


@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl = environment.apiUrl + '/packages';

  constructor(private http: HttpClient) {}

  createPackage(_package: Package): Observable<void> {
    return this.http.post<void>(this.baseUrl, _package);
  }

  updatePackage(_package: Package): Observable<Package> {
    return this.http.put<Package>(this.baseUrl, Package);
  }

  getPackages(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }
/*
  getAllPackagesSortedByCreatorId(creatorId : string, reference : string): Observable<any> {
    if(name){
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`);
  }
*/
  getPackageById(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.baseUrl}/${id}`);
  }

  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deletePackages(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }
  searchPackagesByName(reference: string): Observable<any> {
   
    return this.http.get<Package[]>(`${this.baseUrl}/search`);
  }
  countPackages(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
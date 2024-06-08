import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Package } from '../../models/package';


@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl = environment.apiUrl + '/packages';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }
  
  createPackage(formData: FormData): Observable<Package> {
    return this.http.post<Package>(this.baseUrl, formData);
  }

/*
  createPackage(
    file: File,
    reference: string,
    description: string,
    nbProduct: number,
    price: number,
    soldQuantity: number,
    availableQuantity: number
  ): Observable<Package> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('reference', reference);
    formData.append('description', description);
    formData.append('nbProduct', nbProduct.toString());
    formData.append('price', price.toString());
    formData.append('soldQuantity', soldQuantity.toString());
    formData.append('availableQuantity', availableQuantity.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post<Package>(this.baseUrl, formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
*/
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
 

  updatePackage(packageId: string, file: File, reference: string, description: string,nbProduct:any, price: number, soldQuantity: number, availableQuantity: number): Observable<Package> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('reference', reference);
    formData.append('description', description);
    formData.append('nbProduct', nbProduct.toString());
    formData.append('price', price.toString());
    formData.append('soldQuantity', soldQuantity.toString());
    formData.append('availableQuantity', availableQuantity.toString());
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
  
    return this.http.put<Package>(`${this.baseUrl}/${packageId}`, formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.baseUrl}/sorted`).pipe(
      map((packages: any[]) => {
        packages.forEach(_package => {
          if (_package.image) {
            _package.image = 'data:image/png;base64,' + _package.image;
          }
        });
        return packages;
      })
    );
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
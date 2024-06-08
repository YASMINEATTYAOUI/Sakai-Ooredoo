import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Package } from '../../models/package';
import { Product } from '../../models/product';
import { Brand } from '../../models/brand';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

createProduct(formData: FormData): Observable<any> {
  return this.http.post(this.baseUrl, formData);
}

  updateProduct(productId: number, file: File, reference: string, description: string, price: number, soldQuantity: number, availableQuantity: number): Observable<Package> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('reference', reference);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('soldQuantity', soldQuantity.toString());
    formData.append('availableQuantity', availableQuantity.toString());
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
  
    return this.http.put<Package>(`${this.baseUrl}/${productId}`, formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/sorted`).pipe(
      map((products: any[]) => {
        products.forEach(product => {
          if (product.image) {
            product.image = 'data:image/png;base64,' + product.image;
          }
        });
        return products;
      })
    );
  }

  getProductById(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.baseUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteProducts(ids: number[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }

  searchProductsByName(reference: string): Observable<any> {
    return this.http.get<Package[]>(`${this.baseUrl}/search`);
  }

  countProducts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}

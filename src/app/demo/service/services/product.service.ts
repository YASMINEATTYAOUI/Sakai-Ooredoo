import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../api/product';
import { ProductDto } from '../../models/product';
import { PageEvent } from '../../utils/page-event';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<Object>{
    return this.http.post(`${this.baseUrl}`, product);
  }

  updateProduct(productDto: ProductDto): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, productDto);
  }

  getProducts(pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = { page: pageNumber.toString(),
       size: rows.toString() };
    return this.http.get<any>(`${this.baseUrl}/sorted`, { params });
  }

  getAllProductsSortedByCreatorId(creatorId : string, reference : string, pageEvent: PageEvent): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if(reference){
      params = params.set('reference', reference);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }

  getProductById(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.baseUrl}/${id}`);
  }

  deleteProduct(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteProducts(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
  }

  searchProductsByKeyword(keyword: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<ProductDto[]>(`${this.baseUrl}/search`, { params });
  }

  searchProductsByCategory(category: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('category', category)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<ProductDto[]>(`${this.baseUrl}/category`, { params });
  }

  searchProductssByCategoryAndReference(category: string, reference: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('category', category)
      .set('reference',reference)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<ProductDto[]>(`${this.baseUrl}/category/reference`, { params });
  }

  countProducts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countProductsByTag(tag: string) : Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tags/count/${tag}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../../models/order';
import { PageEvent } from '../../utils/page-event';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) { }

  getServiceUrl() {
    return this.baseUrl;
  }

  toggleOrderStatus(orderId: number): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${orderId}/toggle`, {});
  }
  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  searchOrdersByName(name: string, pageEvent: PageEvent): Observable<any> {
    const rows = pageEvent.rows;
    const pageNumber = pageEvent.first / pageEvent.rows;
    const params = new HttpParams()
      .set('Name', name)
      .set('page', pageNumber.toString())
      .set('size', rows.toString());
    return this.http.get<Order[]>(`${this.baseUrl}/search`, { params });
  }

  countOrders(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}

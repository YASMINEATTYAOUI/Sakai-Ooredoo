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
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(this.baseUrl, order);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sorted`);
  }



  getAllOrdersSortedByCreatorId(creatorId: string, name: string, pageEvent: PageEvent): Observable<any> {
    let params = new HttpParams()
      .set('page', pageEvent.first.toString())
      .set('size', pageEvent.rows.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>(`${this.baseUrl}/creatorId/${creatorId}`, { params });
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteOrders(ids: string[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/batch`, { params: { ids: ids.join(',') } });
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

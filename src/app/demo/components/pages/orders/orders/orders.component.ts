import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Order } from 'src/app/demo/models/order';
import { OrderService } from 'src/app/demo/service/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  providers: [MessageService]
})
export class OrdersComponent implements OnInit, OnDestroy {


  orders: Order[];
  filteredData: Order[];
  name: any;

  order: Order;
  orderToUpdate: Order;

  selectedOrders: Order[];

  messages: Message[];

  totalElements: number = 0;
  tableLoading: boolean = false;

  submitted: boolean = false;

  orderId: any;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.getOrders();
  }
  ngOnDestroy(): void { }

  /*
  getSeverity(status: boolean): string {
    return status ? 'success' : 'danger';
  }
*/
  getSeverity(orderStatus: Boolean): string {
    if (orderStatus === true) {
      return 'success'; // Verified
    } else if (orderStatus === false) {
      return 'danger'; // Rejected
    } else {
      return 'info'; // Not Verified (null case)
    }
  }
  getOrderStatus(orderStatus: Boolean): string {
    if (orderStatus === true) {
      return 'Verified';
    } else if (orderStatus === false) {
      return 'Rejected';
    } else {
      return 'Not Verified';
    }
  }

  toggleOrder(order: any): void {
    this.orderService.toggleOrderStatus(order.id).subscribe({
      next: (updatedOrder: any) => {
        order.orderStatus = updatedOrder.orderStatus,
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Privilege Updated', life: 2000 })
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Toggling Privilege Failed' }),
      complete: () => { }
    });
  }

  getOrders() {
    this.tableLoading = true;
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        this.orders = response;
        this.totalElements = response.totalElements;
        this.filteredData = this.orders;
      },
      error: (e: any) => {
        this.messages = [{ severity: 'error', summary: 'Failed to load Data', detail: 'Server issue' }];
        this.tableLoading = false;
      },
      complete: () => {
        this.tableLoading = false;
      }
    });
  }

  searchOrders(query: string): void {
    this.filteredData = this.orders.filter(order =>
      order.numberOrder.toString().toLowerCase().includes(query.toLowerCase()) ||
      order.articlesNumber.toString().toLowerCase().includes(query.toLowerCase()) ||
      order.totalPrice.toLowerCase().includes(query.toLowerCase()) ||
      order.deliveryType.toString().toLocaleLowerCase().includes(query.toLowerCase()) ||
      order.creationDate.toString().toLowerCase().includes(query.toLowerCase())
    );
  }

  toOrder(order: Order) {
    this.router.navigate(['dashboard/pages/orders', order.id]);
  }
}
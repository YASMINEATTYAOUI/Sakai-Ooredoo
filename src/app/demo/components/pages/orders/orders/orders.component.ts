import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  orderForm: FormGroup;
  isUpdate: boolean = false;

  messages: Message[];

  totalElements: number = 0;
  tableLoading: boolean = false;

  order: Order;
  orderDialog: boolean = false;
  orderToUpdate: Order;
  deleteOrderDialog: boolean = false;

  deleteOrdersDialog: boolean = false;

  selectedOrders: Order[];

  submitted: boolean = false;

  orderId: any;

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.getOrders();
  }
  ngOnDestroy(): void {

  }

  getOrders() {
    this.tableLoading = true;
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        console.log(response)
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

  searchOrders(event) {
    console.log("order selected is " + event);
    this.filteredData = this.orders.filter(item => item.numberOrder.toString().startsWith(event.toLowerCase()));
  }

  

  BlockSelectedOrders(orders: Order[]): void {
    if (orders && orders.length > 0) {
      this.selectedOrders = orders;
      this.deleteOrdersDialog = true;
    }
  }
  toOrder(order: Order) {
    this.router.navigate(['dashboard/pages/account-management/orders', order.id]);
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
  }

}

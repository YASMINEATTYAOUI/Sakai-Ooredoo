import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Order, OrderDto } from 'src/app/demo/models/order';
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
  typing: boolean;

  totalElements: number = 0;
  tableLoading: boolean = false;

  order: Order;
  orderDialog: boolean = false;
  orderToUpdate: OrderDto;
  deleteOrderDialog: boolean = false;

  deleteOrdersDialog: boolean = false;

  selectedOrders: Order[];

  submitted: boolean = false;

  orderId: any;

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router) {
    this.orderForm = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      fullName: ['', [Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(50), Validators.required]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(50), Validators.required]],
      email: ['', [Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(50), Validators.required]],
      password: ['', [Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(50), Validators.required]],
      role: [''],
    });
  }

  ngOnInit() {
    this.getOrders();
  }
  ngOnDestroy(): void {

  }

  save(): void {
    this.submitted = true;
    const data = this.orderForm.value;
    if (this.orderToUpdate) {
      this.updateOrder(data);
    } else {
      this.createOrder(data);
    }
    this.orderDialog = false;
    this.router.navigate(['dashboard/pages/account-management/orders']);
    this.getOrders();
  }

  private createOrder(orderDto: OrderDto): void {
    this.orderService.createOrder(orderDto).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    })
  }

  private updateOrder(orderDto: OrderDto): void {
    if (this.orderToUpdate) {
      this.orderService.updateOrder(orderDto).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Updated', life: 2000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
      });
    }
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
    this.filteredData = this.orders.filter(item => item.name.toLowerCase().startsWith(event.toLowerCase()));
  }

  deleteOrder(order: Order): void {
    if (order) {
      this.order = order;
      this.orderId = order.id;
      this.deleteOrderDialog = true;
    }
  }

  deleteSelectedOrders(orders: Order[]): void {
    if (orders && orders.length > 0) {
      this.selectedOrders = orders;
      this.deleteOrdersDialog = true;
    }
  }
  //navigation to details
  toOrder(order: OrderDto) {
    this.router.navigate(['dashboard/pages/account-management/orders', order.id]);
  }

  openNew() {
    this.order = {};
    this.submitted = false;
    this.orderDialog = true;
  }

  openDialog(order?: OrderDto) {
    this.orderToUpdate = order;
    this.orderDialog = true;
  }

  confirmDeleteSelected() {
    if (this.selectedOrders && this.selectedOrders.length > 0) {
      const orderIds = this.selectedOrders.map(order => order.id);

      this.orderService.deleteOrders(orderIds).subscribe({
        next: () => {
          this.deleteOrdersDialog = false;
          this.selectedOrders = [];
          console.log('Orders deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The orders have been deleted.' });
        },
        error: (e) => {
          console.error('Error deleting orders', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No orders selected for deletion');

    }
  }

  confirmDelete() {
    this.orderService.deleteOrder(this.orderId).subscribe({
      next: () => {
        this.deleteOrderDialog = false;
        this.order = {};
        console.log('Order deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The order has been deleted.' });
        this.getOrders();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),

    })
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
  }

}

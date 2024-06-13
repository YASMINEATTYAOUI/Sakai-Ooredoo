import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../models/product';
import { ProductService } from '../../service/services/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ClientService } from '../../service/services/client.service';
import { OrderService } from '../../service/services/order.service';
import { UserService } from '../../service/services/user.service';
import { AuthenticationService } from '../../service/services/authentication.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [
        DatePipe,
        MessageService
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {
    [x: string]: any;

    userCount: number;
    productCount: number;
    clientCount: number;
    orderCount: number;

    items!: MenuItem[];

    products: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;


    filteredData: Product[];
    totalElements: number = 0;
    tableLoading: boolean = false;

    messages: { severity: string; summary: string; detail: string; }[];

    user: any;
    errorMessage: string | undefined;

    currentUser: any;
    currentDate: string;

    constructor(
        private authService: AuthenticationService,
        public layoutService: LayoutService,
        private userService: UserService,
        private productService: ProductService,
        private clientService: ClientService,
        private orderService: OrderService,
        private datePipe: DatePipe,
        private translate: TranslateService,
        private messageService: MessageService,
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });

            // Add languages
    translate.addLangs(['en', 'fr']);
    // Set default language
    translate.setDefaultLang('en');
    // Use a specific language
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
    

    ngOnInit() {

        this.getCurrentUser();
        this.currentDate = this.datePipe.transform(new Date(), 'fullDate'); // Format the date as you prefer
  
        this.initChart();
        this.getProducts();
        this.countUsers();
        this.countProducts();
        this.countClients();
        this.countOrders();
    }

    getCurrentUser(): void {
        this.authService.getCurrentUser().subscribe(
            data => this.currentUser = data,
            error => console.error('Error fetching user data', error));
    }

    countUsers() {
        this.userService.countUsers().subscribe(count => {
            this.userCount = count;
        });
    }
    countProducts() {
        this.productService.countProducts().subscribe(count => {
            this.productCount = count;
        });
    }
    countClients() {
        this.clientService.countClients().subscribe(count => {
            this.clientCount = count;
        });
    }
    countOrders() {
        this.orderService.countOrders().subscribe(count => {
            this.orderCount = count;
        });
    }

    getProducts() {
        this.tableLoading = true;
        this.productService.getProducts().subscribe({
            next: (response: any) => {
                this.products = response;
                this.totalElements = response.totalElements;
                this.filteredData = this.products;
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

    searchProducts(event) {
        this.filteredData = this.products.filter(item =>
            item.reference.toLowerCase().startsWith(event.toLowerCase()));

    }



    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

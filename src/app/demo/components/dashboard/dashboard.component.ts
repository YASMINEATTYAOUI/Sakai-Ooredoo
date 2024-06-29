import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
import { BaseChartDirective } from 'ng2-charts';

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

    roleChartLabels: string[] = [];
  chartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Number of Users',
        backgroundColor: [] // Tableau pour stocker les couleurs de chaque barre
      }
    ]
  };

  colorPalette: string[] = ['#ff4a3d',  '#ff6459', '#ff8980','#2c397f','#00695f','#a31545', '#82498c', '#ac5700',];

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


    public roleChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false
    };

    //public roleChartLabels: string[] = [];
    public roleChartData: any = {
        labels: this.roleChartLabels,
        datasets: [
            { data: [], label: 'Number of Users' }
        ]
    };


    orders: any[] = [];
    public barChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
            x: {
              grid: { color: 'rgba(0,0,0,0)' },
            },
            y: {
              grid: { color: 'rgba(0,0,0,0)' },
              beginAtZero: true
            }
          }
    };
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];

    public barChartData: any = {
        labels: this.barChartLabels,
        datasets: [
            { data: [], label: 'Orders' }
        ]
    };

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

        this.orderService.getOrders().subscribe(data => {
            this.orders = data;
            this.barChartLabels = this.orders.map(order => order.creationDate);
            this.barChartData.labels = this.barChartLabels;
            this.barChartData.datasets[0].data = this.orders.map(order => order.totalPrice);
        });


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

   
    initChart(): void {
        this.userService.getUsers().subscribe(data => {
          const roleCountMap = new Map<string, number>();
    
          data.forEach(user => {
            const roleName = user.role.name;
            if (roleCountMap.has(roleName)) {
              roleCountMap.set(roleName, roleCountMap.get(roleName) + 1);
            } else {
              roleCountMap.set(roleName, 1);
            }
          });
    
          this.roleChartLabels = Array.from(roleCountMap.keys());
          const dataValues = Array.from(roleCountMap.values());
    
          // Générer des couleurs aléatoires dans la palette prédéfinie
          const backgroundColors = this.generateRandomColors(dataValues.length);
    
          this.chartData.labels = this.roleChartLabels;
          this.chartData.datasets[0].data = dataValues;
          this.chartData.datasets[0].backgroundColor = backgroundColors;
        });
      }
      
    generateRandomColors(count: number): string[] {
        // const colors: string[] = [];
        // for (let i = 0; i < count; i++) {
        //   const randomIndex = Math.floor(Math.random() * this.colorPalette.length);
        //   const color = this.colorPalette[randomIndex];
        //   colors.push(color);
        // }
        // return colors;
        const colors: string[] = [];
  const paletteLength = this.colorPalette.length;

  for (let i = 0; i < count; i++) {
    const colorIndex = i % paletteLength; // Use modulo to cycle through the palette
    const color = this.colorPalette[colorIndex];
    colors.push(color);
  }

  return colors;
      }
      

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

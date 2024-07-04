import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { User } from 'src/app/demo/models/user';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    currentUser:User;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthenticationService
    ) { }


    getCurrentUser(): void {
        this.authService.getCurrentUser().subscribe(
            data => this.currentUser = data,
            error => console.error('Error fetching user data', error));
    }
    
      hasActiveRole(): Boolean {
        console.log('currentUser:', this.currentUser);
        return this.currentUser?.role?.active === true;
      }
    
      isActive(): Boolean {
        console.log('currentUser:', this.currentUser);
        return this.currentUser?.status ;
      }

    canViewUsers(): boolean {
        return this.authService.hasPrivilege('View User');
    }
    canViewRoles(): boolean {
        return this.authService.hasPrivilege('View Role');
    }
    canViewPrivileges(): boolean {
        return this.authService.hasPrivilege('View Privilege');
    }
    canViewBrands(): boolean {
        return this.authService.hasPrivilege('View Brand');
    }
    canViewCategories(): boolean {
        return this.authService.hasPrivilege('View Category');
    }
    canViewThemes(): boolean {
        return this.authService.hasPrivilege('View Theme');
    }
    canViewProducts(): boolean {
        return this.authService.hasPrivilege('View Product');
    }
    canViewPackages(): boolean {
        return this.authService.hasPrivilege('View Package');
    }
    canViewOrders(): boolean {
        return this.authService.hasPrivilege('View Order');
    }
    canViewClients(): boolean {
        return this.authService.hasPrivilege('View Client');
    }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(() => {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                    ]
                },
                {
                    label: 'Account Management',
                    items: [
                        { label: 'Users', icon: 'pi pi-fw pi-user-edit', routerLink: ['/dashboard/pages/account-management/users'], visible: this.canViewUsers() },
                        { label: 'Roles', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/pages/account-management/roles'], visible: this.canViewRoles() },
                        { label: 'Privileges', icon: 'pi pi-fw pi-eye', routerLink: ['/dashboard/pages/account-management/privileges'], visible: this.canViewPrivileges() },
                    ], 
                    visible: this.canViewUsers()||this.canViewRoles()||this.canViewPrivileges()
                },
                {
                    label: 'Sales',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        { label: 'Brands', icon: 'pi pi-fw pi-tags', routerLink: ['dashboard/pages/sales/brands'], visible: this.canViewBrands() },
                        { label: 'Categories', icon: 'pi pi-fw pi-th-large', routerLink: ['dashboard/pages/sales/categories'], visible: this.canViewCategories() },
                        { label: 'Themes', icon: 'pi pi-fw pi-table', routerLink: ['dashboard/pages/sales/themes'], visible: this.canViewThemes() },
                        // { label: 'Colors', icon: 'pi pi-fw pi-palette', routerLink: ['dashboard/pages/sales/colors'] },
                        { label: 'Products', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['dashboard/pages/sales/products'], visible: this.canViewProducts() },
                        { label: 'Packages', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['dashboard/pages/sales/packages'], visible: this.canViewPackages() },
                    ],
                    visible: this.canViewBrands()||this.canViewThemes()||this.canViewProducts()|| this.canViewPackages()
                },
                {
                    label: 'Discount',
                    items: [
                        { label: 'Discount', icon: 'pi pi-fw pi-percentage', routerLink: ['/dashboard/pages/discount'] }
                    ]
                },
                {
                    label: 'Orders',
                    items: [
                        { label: 'Orders', icon: 'pi pi-fw pi-tags', routerLink: ['/dashboard/pages/order/orders'], visible: this.canViewOrders() },
                        { label: 'Delivery', icon: 'pi pi-fw pi-th-large', routerLink: ['/dashboard/pages/order/deliveries'] },
                    ]
                },
                {
                    label: 'Clients',
                    items: [
                        { label: 'Clients', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/pages/clients'], visible: this.canViewClients() }
                    ],
                    visible: this.canViewClients()
                }
            ];
        });
    }
}

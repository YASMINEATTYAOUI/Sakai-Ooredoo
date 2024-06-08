import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
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
                    {label: 'Users', icon: 'pi pi-fw pi-user-edit', routerLink: ['/dashboard/pages/account-management/users']},
                    { label: 'Roles', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/pages/account-management/roles'] },
                    { label: 'Privileges', icon: 'pi pi-fw pi-eye', routerLink: ['/dashboard/pages/account-management/privileges'] },
                ]
            },
            {
                label: 'Sales',
                icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'Brands', icon: 'pi pi-fw pi-tags', routerLink: ['dashboard/pages/sales/brands'] },
                    { label: 'Categories', icon: 'pi pi-fw pi-th-large', routerLink: ['dashboard/pages/sales/categories'] },
                    { label: 'Themes', icon: 'pi pi-fw pi-table', routerLink: ['dashboard/pages/sales/themes'] },
                    { label: 'Colors', icon: 'pi pi-fw pi-palette', routerLink: ['dashboard/pages/sales/colors'] },
                    { label: 'Products', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['dashboard/pages/sales/products'] },
                    { label: 'Packages', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['dashboard/pages/sales/packages'] },
                ]
            },
            {
                label: 'Discount',
                items: [
                    { label: 'Discount', icon: 'pi pi-fw pi-percentage', routerLink: ['/dashboard/pages/discount']  }
                    ]
            },
            {
                label: 'Orders',
                items: [
                    { label: 'Orders', icon: 'pi pi-fw pi-tags', routerLink: ['/dashboard/pages/order/orders']  },
                    { label: 'Delivery', icon: 'pi pi-fw pi-th-large',routerLink: ['/dashboard/pages/order/deliveies'] },
                ]
            },
            {
                label: 'Reports',
                items: [
                    {label: 'Clients', icon: 'pi pi-fw pi-users',routerLink: ['/dashboard/pages/clients']}
                ]
            },
        ]
    }
}

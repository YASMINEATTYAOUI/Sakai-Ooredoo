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
                    { label: 'Discount', icon: 'pi pi-fw pi-percentage', routerLink: ['/dashboard/pages/discount']  },
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
                    { label: 'Revenue', icon: 'pi pi-fw pi-dollar',routerLink: ['/dashboard']  },
                    { label: 'Expenses', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard'] },
                    {label: 'Clients', icon: 'pi pi-fw pi-users',routerLink: ['/dashboard/pages/clients']}
                ]
            },
            {
                label: 'Application',
                items: [
                    { label: 'Performance', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/help'] },
                    { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/settings'] },

                    {
                        label: 'UI Components',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['dashboard/uikit/formlayout'] },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['dashboard/uikit/input'] },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['dashboard/uikit/floatlabel'] },
                            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['dashboard/uikit/invalidstate'] },
                            { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['dashboard/uikit/button'] },
                            { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['dashboard/uikit/table'] },
                            { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['dashboard/uikit/list'] },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['dashboard/uikit/tree'] },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['dashboard/uikit/panel'] },
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['dashboard/uikit/overlay'] },
                            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['dashboard/uikit/media'] },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['dashboard/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['dashboard/uikit/message'] },
                            { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['dashboard/uikit/file'] },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['dashboard/uikit/charts'] },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['dashboard/uikit/misc'] }
                        ]
                    },  
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['dashboard/pages/timeline'] },

                ]
            }
        ]
    }
}

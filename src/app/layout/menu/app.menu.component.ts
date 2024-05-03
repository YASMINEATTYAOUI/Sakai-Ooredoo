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
                    {
                        label: 'Users', icon: 'pi pi-fw pi-user-edit',
                        items: [
                            { label: 'Add', icon: 'pi pi-fw pi-plus', routerLink: ['/dashboard/pages/account-management/users/create-user'] },
                            { label: 'Edit', icon: 'pi pi-fw pi-pencil', routerLink: ['/dashboard/pages/account-management/users'] },
                        ]
                    },
                    { label: 'Roles', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/pages/account-management/roles']},
                    { label: 'Privileges', icon: 'pi pi-fw pi-eye', routerLink: ['/dashboard/pages/account-management/privileges']},
                ]
            },
            {
                label: 'Sales',
                icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'Brands', icon: 'pi pi-fw pi-tags', routerLink: ['dashboard/pages/sales/brands'] },
                    { label: 'Categories', icon: 'pi pi-fw pi-th-large', routerLink: ['dashboard/pages/sales/categories'] },
                    { label: 'Products', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['dashboard/pages/sales/products'] },
                    { label: 'Packages', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['dashboard/pages/sales/packages'] },
                ]
            },
            {
                label: 'Orders',
                items: [
                    { label: 'Orders', icon: 'pi pi-fw pi-tags' },
                    { label: 'Delivery', icon: 'pi pi-fw pi-th-large' },
                ]
            },
            {
                label: 'Reports',
                items: [
                    { label: 'Revenue', icon: 'pi pi-fw pi-dollar', routerLink: ['/dashboard'] },
                    { label: 'Expenses', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard'] },
                    {
                        label: 'Clients', icon: 'pi pi-fw pi-users',
                        items: [
                            { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/dashboard/clients'] },
                            { label: 'Block', icon: 'pi pi-fw pi-ban', routerLink: ['/dashboard/client-profile'] },
                            { label: 'Active', icon: 'pi pi-fw pi-check', routerLink: ['/dashboard/clients'] },
                        ]
                    }
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
                    {
                        label: 'Prime Blocks',
                        items: [
                            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['dashboard/blocks'], badge: 'NEW' },
                            
                        ]
                    },
                    {
                        label: 'Utilities',
                        items: [
                            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['dashboard/utilities/icons'] },
                        ]
                    },
                    {
                        label: 'Pages',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['/']
                            },
                            {
                                label: 'Auth',
                                icon: 'pi pi-fw pi-user',
                                items: [
                                    { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/auth/login'] },
                                    { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/auth/error'] },
                                    { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/auth/access'] }
                                ]
                            },
                        ]
                    },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['dashboard/pages/timeline'] },
                    { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['dashboard/notfound'] },
                    { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['dashboard/pages/empty'] },
                    {
                        label: 'Hierarchy',
                        items: [
                            {
                                label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                    {
                                        label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                        ]
                                    },
                                ]
                            },
                            {
                                label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                    {
                                        label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                ]
                            }
                        ]
                    },

                ]
            }
        ]
    }
}

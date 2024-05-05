import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { Role } from 'src/app/demo/models/role';
import { ProductService } from 'src/app/demo/service/product.service';
import { RoleService } from 'src/app/demo/service/services/role.service';
import { PageEvent } from 'src/app/demo/utils/page-event';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  providers: [MessageService],
})
export class RolesComponent implements OnInit, OnDestroy {

  roles: Role[];
  pageEvent: PageEvent;
  messages: Message[];
  typing: boolean;
  searchText: string = "";
  totalElements: number = 0;
  tableLoading: boolean = false;
  constructor(private roleService: RoleService, private messageService: MessageService) {
    this.pageEvent = {
      first: 0,
      rows: 10
    };
  }
  ngOnInit(): void {
    this.getRoles();
  }

  ngOnDestroy() {
  }
  getRoles() {
    this.tableLoading = true;
    this.roleService.getRoles(this.pageEvent).subscribe({
      next: (response: any) => {
        this.roles = response.content; // Extract the 'content' array from the response
        this.totalElements = response.totalElements;
      },
      error: (e: any) => {
        this.messages = [{ severity: 'error', summary: 'Failed to load Data', detail: 'Stupid Server' }];
        this.tableLoading = false;
      },
      complete: () => {
        this.tableLoading = false;
      }
    });
  }
  onPageChange(event: PageEvent) {
    this.pageEvent.first = event.first;
    this.pageEvent.rows = event.rows;
    this.getRoles();
  }
  onTyping() {
    if (this.searchText === "" || this.searchText === null)
      this.typing = false;
    else
      this.typing = true;
  }
  clearText() {
    this.searchText = "";
    this.typing = false;
    this.getRoles();
  }
  searchUsers() {
    if (this.searchText === "") {
      this.getRoles();
      return;
    }
    if (this.searchText.length > 0) {
      this.tableLoading = true;
      this.roleService.searchRolesByName(this.searchText, this.pageEvent).subscribe({
        next: (response: any) => {
          this.roles = response.content;
          this.totalElements = response.totalElements;
        },
        error: (e: any) => {
          this.tableLoading = false;
          this.messages = [{ severity: 'error', summary: 'Failed to load Data', detail: 'Stupid Server' }];
        },
        complete: () => this.tableLoading = false
      });
    }
  }
  roleDialog: boolean = false;

  deleteRoleDialog: boolean = false;

  deleteRolesDialog: boolean = false;

  

  role: Role = {};

  selectedRoles: Role[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];




  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
  }

  deleteSelectedRoles() {
    this.deleteRolesDialog = true;
  }

  editRole(role: Role) {
    this.role = { ...role };
    this.roleDialog = true;
  }

  deleteRole(role: Role) {
    this.deleteRoleDialog = true;
    this.role = { ...role };
  }

  confirmDeleteSelected() {
    this.deleteRolesDialog = false;
    this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Roles Deleted', life: 3000 });
    this.selectedRoles = [];
  }

  confirmDelete() {
    this.deleteRoleDialog = false;
    this.roles = this.roles.filter(val => val.id !== this.role.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
    this.role = {};
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

  saveRole() {
    this.submitted = true;

    if (this.role.name?.trim()) {
      if (this.role.id) {
        // @ts-ignore
        this.role.inventoryStatus = this.role.inventoryStatus.value ? this.role.inventoryStatus.value : this.role.inventoryStatus;
        this.roles[this.findIndexById(this.role.id)] = this.role;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
      } else {
        this.role.id = this.createId();
        //this.role.code = this.createId();
        //this.role.image = 'product-placeholder.svg';
        // @ts-ignore
        this.role.inventoryStatus = this.role.inventoryStatus ? this.role.inventoryStatus.value : 'INSTOCK';
        this.roles.push(this.role);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.roles = [...this.roles];
      this.roleDialog = false;
      this.role = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}


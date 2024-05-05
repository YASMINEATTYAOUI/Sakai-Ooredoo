import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/demo/models/user';
import { UserService } from 'src/app/demo/service/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [MessageService]
})
export class UsersComponent {
  userDialog: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: User = {};

  selectedUsers: User[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
      //this.userService.getUsers().then(data => this.users = data);

      this.cols = [
          { field: 'user', header: 'User' },
          { field: 'role', header: 'Role' },
          { field: 'accountStatus', header: 'Account Status' }
      ];

      this.statuses = [
          { label: 'Active', value: 'instock' },
          { label: 'Passive', value: 'lowstock' },
          { label: 'Blocked', value: 'outofstock' }
      ];
  }

  openNew() {
      this.user = {};
      this.submitted = false;
      this.userDialog = true;
  }

  deleteSelectedUsers() {
      this.deleteUsersDialog = true;
  }

  editUser(user: User) {
      this.user = { ...user };
      this.userDialog = true;
  }

  deleteUser(user: User) {
      this.deleteUserDialog = true;
      this.user = { ...user };
  }

  confirmDeleteSelected() {
      this.deleteUsersDialog = false;
      this.users = this.users.filter(val => !this.selectedUsers.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      this.selectedUsers = [];
  }

  confirmDelete() {
      this.deleteUserDialog = false;
      this.users = this.users.filter(val => val.id !== this.user.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      this.user = {};
  }

  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  saveUser() {
      this.submitted = true;
/*
      if (this.user.name?.trim()) {
          if (this.user.id) {
              // @ts-ignore
              this.user.inventoryStatus = this.user.inventoryStatus.value ? this.user.inventoryStatus.value : this.user.inventoryStatus;
              this.users[this.findIndexById(this.user.id)] = this.user;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
          } else {
              this.user.id = this.createId();
              this.user.code = this.createId();
              this.user.image = 'user-placeholder.svg';
              // @ts-ignore
              this.user.inventoryStatus = this.user.inventoryStatus ? this.user.inventoryStatus.value : 'INSTOCK';
              this.users.push(this.user);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
          }

          this.users = [...this.users];
          this.userDialog = false;
          this.user = {};
      }
      */
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Role, RoleDto } from 'src/app/demo/models/role';
import { RoleService } from 'src/app/demo/service/services/role.service';
import { PageEvent } from 'src/app/demo/utils/page-event';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  providers: [MessageService, ConfirmationService],
})
export class RolesComponent implements OnInit, OnDestroy {

  roles: Role[];
  name: any;

  roleForm: FormGroup; 
  isUpdate: boolean = false;

  pageEvent: PageEvent;
  messages: Message[];
  typing: boolean;
  searchText: string = "";
  totalElements: number = 0;
  tableLoading: boolean = false;

  selectedroles: RoleDto[];
  role: Role;
  roleDialog: boolean = false;
  roleToUpdate: RoleDto;

  deleteRoleDialog: boolean = false;

  deleteRolesDialog: boolean = false;

  selectedRoles: Role[] = [];

  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];


  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.pageEvent = { first: 0, rows: 10 };

    this.roleForm = this.formBuilder.group({
      id: [''],
      name:['',[Validators.pattern('^[a-zA-Z0-9 ]*$'),Validators.maxLength(50),Validators.required    ]],
      description:[''],
    });

  }

  ngOnInit(): void {
    this.getRoles();
    //this.retrieveRoles();
  }

  ngOnDestroy() {
  }
  openDialog(role?: RoleDto) {
    this.roleToUpdate = role;
    this.roleDialog = true;
  }
  onPageChange(event: PageEvent) {
    this.pageEvent.first = event.first;
    this.pageEvent.rows = event.rows;
    this.getRoles();
  }
  onTyping() {
    if (this.searchText == "" || null)
      this.typing = false;
    else
      this.typing = true;
  }

  clearText() {
    this.searchText = "";
    this.typing = false;
    this.getRoles();
  }

  save(): void {
    this.submitted = true;
    const data = this.roleForm.value;
    if (this.roleToUpdate) {
      this.updateRole(data);
    } else {
      this.createRole(data);
    }
  }

  private createRole(roleDto: RoleDto): void {
    this.roleService.createRole(roleDto).subscribe({
      next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 3000 }), 
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => {} // No need to emit here as it's handled in the 'next' and 'error' callbacks
    });
  }

  private updateRole(roleDto: RoleDto): void {
    if (this.roleToUpdate) {
      this.roleService.updateRole(roleDto).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => {} // No need to emit here as it's handled in the 'next' and 'error' callbacks
      });
    }
  }

  getRoles() {
    this.tableLoading = true;
    this.roleService.getRoles(this.pageEvent).subscribe({
      next: (response: any) => {
        this.roles = response.content; // Extract the 'content' array from the response
        this.totalElements = response.totalElements;
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


  searchRoles() {
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
          this.messages = [{ severity: 'error', summary: 'Failed to load Data', detail: 'Server issue' }];
        },
        complete: () => this.tableLoading = false
      });
    }
  }

  deleteRole(role) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected entity?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roleService.deleteRole(role.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The entity has been deleted.' });
            this.getRoles();
          },
          error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' })
        });
      }
    });
  }

  deleteSelectedRoles() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected entities?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const idsToDelete = this.selectedRoles.map(role => role.id);
        this.roleService.deleteRoles(idsToDelete).subscribe({
          next: (response: any) => {
            this.getRoles();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });
            this.selectedRoles = [];
          },
          error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong with the deletion', life: 3000 })
        });
      }
    });
  }





  //navigation to details
  toRole(role: RoleDto) {
    this.router.navigate(['dashboard/products/', role.id]);
  }
  currentRole: Role = {};
  currentIndex = -1;

  retrieveRoles(): void {
    this.roleService.getAll().subscribe({
      next: (data) => {
        this.roles = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveRoles();
    this.currentRole = {};
    this.currentIndex = -1;
  }

  setActiveRole(role: Role, index: number): void {
    this.currentRole = role;
    this.currentIndex = index;
  }

  removeAllRoles(): void {
    this.roleService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchName(): void {
    this.currentRole = {};
    this.currentIndex = -1;

    this.roleService.findByName(this.name).subscribe({
      next: (data) => {
        this.roles = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }



  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
  }
/*
  deleteSelectedRoles() {
    this.deleteRolesDialog = true;
  }
*/
  editRole(role: Role) {
    this.role = { ...role };
    this.roleDialog = true;
  }
  /*
    deleteRole(role: Role) {
      this.deleteRoleDialog = true;
      this.role = { ...role };
    }
  */
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
        //this.role.id = this.createId();
        //this.role.code = this.createId();
        //this.role.image = 'product-placeholder.svg';
        // @ts-ignore
        this.role.inventoryStatus = this.role.inventoryStatus ? this.role.inventoryStatus.value : 'ADMIN';
        this.roles.push(this.role);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 3000 });
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
  /*
    createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }
  */
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }




}


import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message} from 'primeng/api';
import { Role, RoleDto } from 'src/app/demo/models/role';
import { RoleService } from 'src/app/demo/service/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  providers: [MessageService],
})
export class RolesComponent implements OnInit, OnDestroy {

  roles: Role[];
  filteredData: Role[];
  name: any;

  roleForm: FormGroup;
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;

  totalElements: number = 0;
  tableLoading: boolean = false;

  role: Role;
  roleDialog: boolean = false;
  roleToUpdate: RoleDto;

  deleteRoleDialog: boolean = false;

  deleteRolesDialog: boolean = false;

  selectedRoles: Role[];

  submitted: boolean = false;
  
  roleId: any;
  showRoleDetailsPopup: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.roleForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      description: [''],
    });

  }

  ngOnInit(): void {
    this.getRoles();
  }

  ngOnDestroy() {
  }
  

  save(): void {
    this.submitted = true;
    const data = this.roleForm.value;
    if (this.roleToUpdate) {
      this.updateRole(data);
    } else {
      this.createRole(data);
    }
    this.roleDialog = false;
    this.router.navigate(['dashboard/pages/account-management/roles']);
    this.getRoles();
  }

  private createRole(roleDto: RoleDto): void {
    this.roleService.createRole(roleDto).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    })
    this.roles.push(this.role);
  }

  private updateRole(roleDto: RoleDto): void {
    if (this.roleToUpdate) {
      this.roleService.updateRole(roleDto).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 2000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { } // No need to emit here as it's handled in the 'next' and 'error' callbacks
      });
    }
  }

  getRoles() {
    this.tableLoading = true;
    this.roleService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response; // Extract the 'content' array from the response
        this.totalElements = response.totalElements;
        this.filteredData = this.roles;

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

  searchRoles(event) {
    console.log("role selected is " + event);
    this.filteredData = this.roles.filter(item => item.name.toLowerCase().startsWith(event.toLowerCase()));
  }

  deleteRole(role: Role): void {
    if (role) {
      this.role = role;
      this.roleId = role.id;
      this.deleteRoleDialog = true;
    }
  }

  deleteSelectedRoles(roles: Role[]): void {
    if (roles && roles.length > 0) {
      this.selectedRoles = roles;
      this.deleteRolesDialog = true;
    }
  }
  //navigation to details
  toRole(role: RoleDto) {
    this.router.navigate(['dashboard/products/', role.id]);
  }

  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
  }

  openDialog(role?: RoleDto) {
    this.roleToUpdate = role;
    this.roleDialog = true;
  }

  confirmDeleteSelected() {
    if (this.selectedRoles && this.selectedRoles.length > 0) {
      const roleIds = this.selectedRoles.map(role => role.id);

      this.roleService.deleteRoles(roleIds).subscribe({
        next: () => {
          this.deleteRolesDialog = false;
          this.selectedRoles = []; // Clear the roles to delete
          console.log('Roles deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The roles have been deleted.' });
          this.getRoles();
        },
        error: (e) => {
          console.error('Error deleting roles', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No roles selected for deletion');
      // Show a message to inform the user that no roles are selected for deletion
    }
  }

  confirmDelete() {
    this.roleService.deleteRole(this.roleId).subscribe({
      next: () => {
        this.deleteRoleDialog = false;
        this.role = {};
        console.log('Role deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The role has been deleted.' });
        this.getRoles();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),

    })
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

  

}
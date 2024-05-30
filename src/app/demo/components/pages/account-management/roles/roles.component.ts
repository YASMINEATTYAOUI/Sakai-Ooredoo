import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Role } from 'src/app/demo/models/role';
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
  roleToUpdate: Role;

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
      active: [false],
    });

  }

  ngOnInit(): void {
    this.getRoles();
  }

  ngOnDestroy() {
  }

  getSeverity(active: boolean): string {
    return active ? 'success' : 'danger';
  }

  private createRole(role: Role): void {
    this.roleService.createRole(role).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    })
  }
  private updateRole(role: Role): void {
    if (role.id) {
      console.log(role.id);
      if (role.active === null || role.active === undefined) {
        role.active = false;
      }

      this.roleService.updateRole(role.id, role).subscribe({
        next: (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 2000 });
          this.getRoles(); // Refresh roles list after update
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
      });
    }
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
    this.roles.push(this.role);
  }

  getRoles() {
    this.tableLoading = true;
    this.roleService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response;
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

  toRole(role: Role) {
    this.router.navigate(['dashboard/products/', role.id]);
  }

  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
  }

  openDialog(role: Role) {
    this.roleToUpdate = role;
    this.roleService.getRoleById(role.id);

    this.roleDialog = true;
    this.roleForm.patchValue({
      id: role.id,
      name: role.name,
      description: role.description,
      status: role.active
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
    this.roleForm.reset();
  }



}
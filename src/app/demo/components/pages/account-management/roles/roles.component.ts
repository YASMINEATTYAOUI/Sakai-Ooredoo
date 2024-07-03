import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Role } from 'src/app/demo/models/role';
import { Privilege } from 'src/app/demo/models/privilege';
import { RoleService } from 'src/app/demo/service/services/role.service';
import { PrivilegeService } from 'src/app/demo/service/services/privilege.service';
import { UserService } from 'src/app/demo/service/services/user.service';
import { User } from 'src/app/demo/models/user';
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';

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


  selectedPrivilegeId: Privilege;
  privileges: any[]= [];

  deleteRoleDialog: boolean = false;
  deleteRolesDialog: boolean = false;

  selectedRoles: Role[];

  submitted: boolean = false;

  roleId: any;
  showRoleDetailsPopup: boolean;

  colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  rolePrivileges: Privilege[] = [];

  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private privilegeService: PrivilegeService,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.roleForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      description: ['',[Validators.maxLength(200), Validators.required]],
      active: ['',[Validators.required]],
      privileges: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.getRoles();
    this.loadPrivileges();
    //this.rolePrivileges = this.currentUser.role.privileges;
  
  }

  ngOnDestroy() {
  }

  loadPrivileges() {
    this.privilegeService.getPrivileges().subscribe(privileges => {
      this.privileges = privileges;
    });
  }
  
  // privilegesSelectedEvent(event: any) {
  //   this.role.privileges = <Privilege[]>event.value;
  // }

  privilegesSelectedEvent(event: any) {
    if (!this.role) {
      this.role = {} as Role; // Ensure role is defined
    }
    this.role.privileges = <Privilege[]>event.value;
  }

  getSeverity(active: boolean): string {
    return active ? 'success' : 'danger';
  }

  getCircleColor(index: number): string {
    return this.colors[index % this.colors.length];
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
      if (role.active === null || role.active === undefined) {
        role.active = false;
      }

      this.roleService.updateRole(role.id, role).subscribe({
        next: (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 2000 });
          this.getRoles();
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => {}
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

  searchUsers(query: string): void {
    this.filteredData = this.roles.filter(role =>
      role.name.toLowerCase().includes(query.toLowerCase()));
  }

  toRole(role: Role) {
    this.router.navigate(['dashboard/roles/', role.id]);
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
      privileges:role.privileges,
      active: role.active
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
    this.roleForm.reset();
  }


  canAddRole(): boolean {
    return this.authService.hasPrivilege('Create Role');
  }

  canEditRole(): boolean {
    return this.authService.hasPrivilege('Update Role');
  }  

}
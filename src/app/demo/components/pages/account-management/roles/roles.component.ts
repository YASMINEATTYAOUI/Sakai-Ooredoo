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

  selectedRoles: Role[] ;

  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20, 30];


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
    this.roleDialog = false;
    this.router.navigate(['dashboard/pages/account-management/roles']);
    this.getRoles()
  }

  private createRole(roleDto: RoleDto): void {
    this.roleService.createRole(roleDto).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 2000 }), 
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => {} 
    })
    this.roles.push(this.role);
  }

  private updateRole(roleDto: RoleDto): void {
    if (this.roleToUpdate) {
      this.roleService.updateRole(roleDto).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 2000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => {} // No need to emit here as it's handled in the 'next' and 'error' callbacks
      });
    }
  }

  getRoles() {
    this.tableLoading = true;
    this.roleService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response; // Extract the 'content' array from the response
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
/*
  deleteRole(roleId: string): void {
    this.deleteRoleDialog = true;
    this.roleService.deleteRole(roleId).subscribe({
      next: () => {
        // Role deleted successfully
        console.log('Role deleted successfully');
        // Perform any additional actions (e.g., refresh roles list)
      },
      error: (error) => {
        // Error occurred while deleting role
        console.error('Error deleting role:', error);
        // Handle error (e.g., display error message to user)
      }
    });
  }
*/

deleteRole(role: Role): void {
  this.deleteRoleDialog = true;
  this.roleService.deleteRole(role.id).subscribe({
    next: () => {
      console.log('Role deleted successfully');
      this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The entity has been deleted.' });
      this.getRoles();
    },
    error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),
   
  })
  
}

/*
  deleteRole(role) {
    this.deleteRoleDialog = true;
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
*/
  deleteSelectedRoles() {
    this.deleteRolesDialog = true;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected entities?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const idsToDelete = this.selectedRoles.map(role => role.id);
        this.roleService.deleteRoles(idsToDelete).subscribe({
          next: (response: any) => {
            
            this.getRoles();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 2000 });
            this.selectedRoles = [];
          },
          error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong with the deletion', life: 2000 })
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

  removeAllRoles(): void {
    this.roleService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        //this.refreshList();
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
    this.role = { ...role }
    this.submitted = false;
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
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Roles Deleted', life: 2000 });
    this.selectedRoles = [];
  }

  confirmDelete() {
    this.deleteRoleDialog = false;
    this.role = {};
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

}


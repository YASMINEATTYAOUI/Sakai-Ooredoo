import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { User } from 'src/app/demo/models/user';
import { UserService } from 'src/app/demo/service/services/user.service';
import { RoleService } from 'src/app/demo/service/services/role.service';
import { Role } from 'src/app/demo/models/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [MessageService]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  filteredData: User[];
  name: any;
  selectedRoleId: Role;

  roles: any[] = [];

  userForm: FormGroup;
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;

  totalElements: number = 0;
  tableLoading: boolean = false;

  user: User;
  userDialog: boolean = false;
  userToUpdate: User;
  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  selectedUsers: User[];

  submitted: boolean = false;

  userId: any;

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private messageService: MessageService,
    private router: Router) {
    /*this.userForm = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      fullName: ['', [Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(50), Validators.required]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(50), Validators.required]],
      email: ['', [Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(50), Validators.required]],
      password: ['', [Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(50), Validators.required]],
      role: [''],
    });*/
  }

  ngOnInit() {
    this.getUsers();
    this.loadRoles(); 
    
  }
  ngOnDestroy(): void {

  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  save(): void {
    this.submitted = true;
    console.log(this.user)
   
    if (this.userToUpdate) {
      this.updateUser(this.user);
    } else {
      this.createUser(this.user);
    }
    this.userDialog = false;

  }

  private createUser(userDto: User): void {
    this.userService.createUser(userDto).subscribe({
      next: (response) => {
        this.users.push(response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 2000 

        }
      )
    },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    })
  }

  private updateUser(userDto: User): void {
    if (this.userToUpdate) {
      this.userService.updateUser(userDto).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 2000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
      });
    }
  }

  getUsers() {
    this.tableLoading = true;
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
        this.totalElements = response.totalElements;
        this.filteredData = this.users;

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

  searchUsers(event) {
    console.log("user selected is " + event);
    this.filteredData = this.users.filter(item => item.username.toLowerCase().startsWith(event.toLowerCase()));
  }

  deleteUser(user: User): void {
    if (user) {
      this.user = user;
      this.userId = user.id;
      this.deleteUserDialog = true;
    }
  }

  deleteSelectedUsers(users: User[]): void {
    if (users && users.length > 0) {
      this.selectedUsers = users;
      this.deleteUsersDialog = true;
    }
  }

  toUser(user: User) {
    this.router.navigate(['dashboard/pages/account-management/users', user.id]);
  }

  roleSelectedEvent(event: any){
    this.user.roles =event.value;
  }

  openNew() {
   this.user = new User();
    this.submitted = false;
    this.userDialog = true;

    console.log(this.roles)
  }

  openDialog(user?: User) {
    this.userToUpdate = user;
    this.userDialog = true;
  }

  confirmDeleteSelected() {
    if (this.selectedUsers && this.selectedUsers.length > 0) {
      const userIds = this.selectedUsers.map(user => user.id);

      this.userService.deleteUsers(userIds).subscribe({
        next: () => {
          this.deleteUsersDialog = false;
          this.selectedUsers = [];
          console.log('Users deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The users have been deleted.' });
        },
        error: (e) => {
          console.error('Error deleting users', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No users selected for deletion');

    }
  }

  confirmDelete() {
    this.userService.deleteUser(this.userId).subscribe({
      next: () => {
        this.deleteUserDialog = false;
        this.user = {
          id: 0,
          username: '',
          fullName: '',
          email: '',
          phoneNumber: 0,
          password: '',
          creationDate: null,
          lastModifiedDate: null,
          roles: [],
        } as User;
        console.log('User deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The user has been deleted.' });
        this.getUsers();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),

    })
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

}
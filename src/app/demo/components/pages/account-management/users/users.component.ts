import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, Message, MenuItem } from 'primeng/api';
import { User } from 'src/app/demo/models/user';
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { UserService } from 'src/app/demo/service/services/user.service';
import { RoleService } from 'src/app/demo/service/services/role.service';
import { Role } from 'src/app/demo/models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [MessageService]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  filteredData: User[];
  name: any;
  user: User = new User;
  //user2 :UserDto ;
  /*
  user = {
    username: '',
    fullName: '',
    email: '',
    phoneNumber: 0,
    password: '',
    creationDate: null,
    lastModifiedDate: null,
    role: null ,
  } 
  */
  userDialog: boolean = false;
  userDialogUpdate: boolean = false;
  userToUpdate: User;
  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  selectedUsers: User[];
  selectedRoleId: Role;
  roles: any[] = [];

  messages: Message[];

  totalElements: number = 0;
  tableLoading: boolean = false;

  submitted: boolean = false;

  userId: any;

  userUpdateForm: FormGroup;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  currentUser:User;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.userUpdateForm = this.formBuilder.group({
      id: [],
      role: ['', Validators.required],
      status: [''],
    });

  }

  ngOnInit() {

    this.items = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Acount Management' }, { label: 'Users', route: '/inputtext' }]
    this.getUsers();
    this.loadRoles();
    console.log()
    this.getCurrentUser()
    
    console.log(this.hasActiveRole())
    console.log(this.isActive())
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
        data => this.currentUser = data,
        error => console.error('Error fetching user data', error));
}

  hasActiveRole(): Boolean {
    console.log('currentUser:', this.currentUser);
    return this.currentUser?.role?.active === true;
  }

  isActive(): Boolean {
    console.log('currentUser:', this.currentUser);
    return this.currentUser?.status ;
  }


  ngOnDestroy(): void {

  }

  getSeverity(active: boolean): string {
    return active ? 'success' : 'danger';
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  save(): void {
    this.submitted = true;

    if (this.userToUpdate) {
      this.updateUser();
    } else {

      this.createUser(this.user);
    }
    this.userDialog = false;
    this.userDialogUpdate = false;
  }

  private createUser(user: User): void {

    this.userService.createUser(user).subscribe({
      next: (response) => {
        console.log(user);
        this.users.push(response);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 2000 })
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    })

  }

  // private updateUser(): void {
  //   if (this.userToUpdate) {
  //     const formData = new FormData();
  //     formData.append('role', this.userUpdateForm.get('role').value);
  //     formData.append('status', this.userUpdateForm.get('status').value);

  //     console.log('FormData:', formData.get('role'), formData.get('status'));


  //     this.userService.updateUsers(this.userToUpdate.id, formData).subscribe({
  //       next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 2000 }),
  //       error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
  //       complete: () => { }
  //     });
  //   }
  // }

  private updateUser(): void {
    if (this.userToUpdate) {
      const formData = new FormData();
      formData.append('role', this.userUpdateForm.get('role').value.id);
      formData.append('status', this.userUpdateForm.get('status').value);

      // Log the FormData to check its contents
      console.log('Updating user with ID:', this.userToUpdate.id);
      console.log('FormData:', {
        role: formData.get('role'),
        status: formData.get('status')
      });

      this.userService.updateUsers(this.userToUpdate.id, formData).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 2000 }),
        error: (e) => {
          console.error('Update Failed', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' });
        },
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

  searchUsers(query: string): void {
    console.log("user selected is " + event);
    this.filteredData = this.users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.fullName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.phoneNumber.toString().toLocaleLowerCase().includes(query.toLowerCase()) ||
      user.role.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  deleteUser(user: User): void {
    if (user) {
      //this.user = user;
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

  roleSelectedEvent(event: any) {
    this.user.role = event.value;
  }

  openNew() {
    //this.user = new User();
    this.submitted = false;
    this.userDialog = true;

  }

  openDialog(user?: User) {
    this.userToUpdate = user;
    this.userService.getUserById(user.id).subscribe(response => {
      this.user = response;
      this.userUpdateForm.patchValue({

        role: this.user.role,
        status: this.user.status,
      });
    });
    this.userDialogUpdate = true;
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
        /*
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
        */
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

  canAddUser(): boolean {
    return this.authService.hasPrivilege('Update User');
  }
  canEditUser(): boolean {
    return this.authService.hasPrivilege('Update User');
  }

}
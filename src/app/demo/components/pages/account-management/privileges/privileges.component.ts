import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { PrivilegeService } from 'src/app/demo/service/services/privilege.service';
import { Router } from '@angular/router';
import { MessageService, Message} from 'primeng/api';
import { Privilege} from 'src/app/demo/models/privilege'; 

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  providers: [MessageService],
})
export class PrivilegesComponent implements OnInit, OnDestroy {
  files1: TreeNode[] = [];

  selectedFiles1: TreeNode[] = [];
  cols: any[] = [];

  privileges: Privilege[]; 
  filteredData: Privilege[];
  name: any;

  privilegeForm: FormGroup;
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;

  totalElements: number = 0;
  tableLoading: boolean = false;

  privilege: Privilege;
  privilegeDialog: boolean = false;
  privilegeToUpdate: Privilege; 

  deletePrivilegeDialog: boolean = false; 

  deletePrivilegesDialog: boolean = false; 

  selectedPrivileges: Privilege[]; 

  submitted: boolean = false;
  
  privilegeId: any; 

  constructor(
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService, 
    private messageService: MessageService,
    private router: Router,
  ) {
    this.privilegeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      description: [''],
    });

  }

  ngOnInit(): void {
    this.getPrivileges();
    }

  ngOnDestroy() {
  }
  

  save(): void {
    this.submitted = true;
    const data = this.privilegeForm.value;
    if (this.privilegeToUpdate) {
      this.updatePrivilege(data); 
    } else {
      this.createPrivilege(data); 
    }
    this.privilegeDialog = false; 
    this.router.navigate(['dashboard/pages/account-management/privileges']);
    this.getPrivileges(); 
  }

  private createPrivilege(privilege: Privilege): void { 
    this.privilegeService.createPrivilege(privilege).subscribe({ 
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Privilege Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }), 
      complete: () => { }
    })
    this.privileges.push(this.privilege); 
  }

  private updatePrivilege(privilege: Privilege): void { 
    if (this.privilegeToUpdate) {
      this.privilegeService.updatePrivilege(privilege).subscribe({ 
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Privilege Updated', life: 2000 }), // Renommé Role en Privilege
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }), 
        complete: () => { } 
      });
    }
  }

  getPrivileges() { 
    this.tableLoading = true;
    this.privilegeService.getPrivileges().subscribe({ 
      next: (response: any) => {
        this.privileges = response; 
        this.totalElements = response.totalElements;
        this.filteredData = this.privileges; 

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

  searchPrivileges(event) {
    console.log("privilege selected is " + event); 
    this.filteredData = this.privileges.filter(item => item.name.toLowerCase().startsWith(event.toLowerCase())); // Renommé roles en privileges, role en privilege
  }

  deletePrivilege(privilege: Privilege): void {
    if (privilege) {
      this.privilege = privilege; 
      this.privilegeId = privilege.id; 
      this.deletePrivilegeDialog = true; 
    }
  }

  deleteSelectedPrivileges(privileges: Privilege[]): void { 
    if (privileges && privileges.length > 0) {
      this.selectedPrivileges = privileges; 
      this.deletePrivilegesDialog = true; 
    }
  }
  //navigation to details
  toPrivilege(privilege: Privilege) { 
    this.router.navigate(['dashboard/products/', privilege.id]); 
  }

  openNew() {
    this.privilege = {}; 
    this.submitted = false;
    this.privilegeDialog = true; 
  }

  openDialog(privilege?: Privilege) { 
    this.privilegeToUpdate = privilege; 
    this.privilegeDialog = true;
  }

  confirmDeleteSelected() {
    if (this.selectedPrivileges && this.selectedPrivileges.length > 0) {
      const privilegeIds = this.selectedPrivileges.map(privilege => privilege.id); 

      this.privilegeService.deletePrivileges(privilegeIds).subscribe({ 
        next: () => {
          this.deletePrivilegesDialog = false;
          this.selectedPrivileges = []; 
          console.log('Privileges deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The privileges have been deleted.' }); 
          this.getPrivileges(); 
        },
        error: (e) => {
          console.error('Error deleting privileges', e); 
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }); 
        }
      });
    } else {
      console.warn('No privileges selected for deletion'); 
    }
  }

  confirmDelete() {
    this.privilegeService.deletePrivilege(this.privilegeId).subscribe({
      next: () => {
        this.deletePrivilegeDialog = false; 
        this.privilege = {}; 
        console.log('Privilege deleted successfully'); 
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The privilege has been deleted.' }); 
        this.getPrivileges(); 
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }), 

    })
  }

  hideDialog() {
    this.privilegeDialog = false;
    this.submitted = false;
  }

}

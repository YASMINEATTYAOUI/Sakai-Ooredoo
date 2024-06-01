import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message} from 'primeng/api';
import { Privilege} from 'src/app/demo/models/privilege'; 
import { PrivilegeService } from 'src/app/demo/service/services/privilege.service';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  providers: [MessageService],
})
export class PrivilegesComponent implements OnInit, OnDestroy {

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

  sizes!: any[];

  selectedSize: any = '';

  colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  constructor(
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService, 
    private messageService: MessageService,
    private router: Router,
  ) {
    this.privilegeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      active: [''],
    });

  }

  ngOnInit(): void {
    this.getPrivileges();

    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large',  class: 'p-datatable-lg' }
  ];
    }

  ngOnDestroy() {
  }
  
  getSeverity(active: boolean): string {
    return active ? 'success' : 'danger';
  }
  
  getCircleColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  save(): void {
    this.submitted = true;
    const data = this.privilegeForm.value;
    if (this.privilegeToUpdate) {
    } else {
      this.createPrivilege(data); 
    }
    this.privilegeDialog = false; 
    this.privileges.push(this.privilege); 
  }

  private createPrivilege(privilege: Privilege): void { 
    this.privilegeService.createPrivilege(privilege).subscribe({ 
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Privilege Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }), 
      complete: () => { }
    })
  }

  privilegeSelectedEvent(event: any) {
    this.privilegeId = event.value;
    //this.privilege.id = event.value;
    //event.value=this.productForm.get('brand').value;
    //this.productForm.get('brand').value =event.value;
  }

  togglePrivilege(privilege: any): void {
    this.privilegeService.togglePrivilegeStatus(privilege.id).subscribe({
      next: (updatedPrivilege: any) => {
        privilege.active = updatedPrivilege.active,
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Privilege Updated', life: 2000 }) // Renommé Role en Privilege
    },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Toggling Privilege Failed' }), 
      complete: () => { } 
  });
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
 


  
  openNew() {
    this.privilege = {}; 
    this.submitted = false;
    this.privilegeDialog = true; 
  }

  openDialog(privilege?: Privilege) { 
    this.privilegeToUpdate = privilege; 
    this.privilegeDialog = true;

    this.privilegeService.getPrivilegeById(privilege.id);
    this.privilegeForm.patchValue({
      id: privilege.id,
      name: privilege.name,
      status: privilege.active
    });
  }

  hideDialog() {
    this.privilegeDialog = false;
    this.submitted = false;
    this.privilegeForm.reset();
  }

}

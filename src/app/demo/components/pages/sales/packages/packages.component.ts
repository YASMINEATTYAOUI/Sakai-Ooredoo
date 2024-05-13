import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message} from 'primeng/api';
import { Package, PackageDto } from 'src/app/demo/models/package'; 
import { PackageService } from 'src/app/demo/service/services/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  providers: [MessageService],

})

export class PackagesComponent implements OnInit, OnDestroy {

  packages: Package[]; 
  filteredData: Package[]; 
  name: any;

  packageForm: FormGroup; 
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;
  totalElements: number = 0;
  tableLoading: boolean = false;

  package: Package; 
  packageDialog: boolean = false; 
  packageToUpdate: PackageDto;
  deletePackageDialog: boolean = false;

  deletePackagesDialog: boolean = false; 

  selectedPackages: Package[];

  submitted: boolean = false;
  packageId: any;

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService, 
    private messageService: MessageService,
    private router: Router
  ) {
    this.packageForm = this.formBuilder.group({
      id: [''],
      name:['',[Validators.pattern('^[a-zA-Z0-9 ]*$'),Validators.maxLength(50),Validators.required    ]],
      description:[''],
    });
  }

  ngOnInit(): void {
    this.getPackages(); 
  }

  ngOnDestroy() {
  }

  save(): void {
    this.submitted = true;
    const data = this.packageForm.value;
   console.log(this.package)
   this.createPackage(this.package);
    // if (this.packageToUpdate) {
    //   this.updatePackage(data); 
    // } else {
    //   this.createPackage(data); 
    // }
    this.packageDialog = false;

  }

  private createPackage(packageDto: Package): void { 
    this.packageService.createPackage(packageDto).subscribe({ 
      next: (response) =>  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Package Created', life: 2000 }), 
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => {} 
    })
    this.packages.push(this.package); 
  }

  private updatePackage(packageDto: PackageDto): void {
    if (this.packageToUpdate) {
      this.packageService.updatePackage(packageDto).subscribe({ 
        next: (response) => {
          console.log('Package updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Package Updated', life: 2000 });
          this.getPackages(); 
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => {} 
      });
    }
  }

  getPackages() { 
    this.tableLoading = true;
    this.packageService.getPackages().subscribe({ 
      next: (response: any) => {
        this.packages = response; 
        this.totalElements = response.totalElements;
        this.filteredData = this.packages; 
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

  searchPackages(event) { 
    console.log("package selected is " +event);
    this.filteredData = this.packages.filter(item => item.reference.toLowerCase().startsWith(event.toLowerCase()));
  
  }

  deletePackage(_package: Package): void { 
    if (_package) {
      this.package = _package; 
      this.packageId = _package.id; 
      this.deletePackageDialog = true;
    }
  }

  deleteSelectedPackages(packages: Package[]) { 
    if (packages && packages.length > 0) {
      this.selectedPackages = packages; 
      this.deletePackagesDialog = true; 
    }
  }

  //navigation to details
  toPackage(_package: PackageDto) { 
    this.router.navigate(['dashboard/pages/sales/packages', _package.id]); 
  }

  openNew() {
    this.package = {}; 
    this.submitted = false;
    this.packageDialog = true;
  }

  openDialog(_package?: PackageDto) {
    this.packageToUpdate = _package; 
    this.packageDialog = true;
  }
_package
  confirmDeleteSelected() {
    if (this.selectedPackages && this.selectedPackages.length > 0) { 
      const packageIds = this.selectedPackages.map(_package => _package.id); 

      this.packageService.deletePackages(packageIds).subscribe({ 
        next: () => {
          this.deletePackagesDialog = false;
          this.selectedPackages = [];
          console.log('Packages deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The packages have been deleted.' });
          this.getPackages(); 
        },
        error: (e) => {
          console.error('Error deleting packages', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No packages selected for deletion'); 
      
    }
  }

  confirmDelete() {
    this.packageService.deletePackage(this.packageId).subscribe({
      next: () => {
        this.deletePackageDialog = false; 
        this.package = {}; 
        console.log('Package deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The package has been deleted.' });
        this.getPackages(); 
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),

    })
  }

  hideDialog() {
    this.packageDialog = false;
    this.submitted = false;
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Product } from 'src/app/demo/models/product';
import { Package } from 'src/app/demo/models/package';
import { PackageService } from 'src/app/demo/service/services/package.service';
import { ProductService } from 'src/app/demo/service/services/product.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  providers: [MessageService],

})

export class PackagesComponent implements OnInit, OnDestroy {

  packages: Package[];
  filteredData: Package[];
  name: any;
  file: File;
  _package: Package;
  selectedProductId: Product;
  products: any[] = [];

  packageForm: FormGroup;

  packageDialog: boolean = false;
  packageToUpdate: Package;
  deletePackageDialog: boolean = false;
  deletePackagesDialog: boolean = false;
  selectedPackages: Package[];

  messages: Message[];
  totalElements: number = 0;
  tableLoading: boolean = false;
  submitted: boolean = false;
  packageId: any;


  constructor(
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router) {
    this.packageForm = this.formBuilder.group({
      id: [''],
      reference: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      description: [''],
      nbProduct: [],
      price: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
      soldQuantity: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
      availableQuantity: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getPackages();
    this.loadProducts();
  }

  ngOnDestroy() {
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  productsSelectedEvent(event: any) {
    this._package.products = event.value;
  }

  save(): void {
    this.submitted = true;
    if (this.packageToUpdate) {
      this.updatePackage(this._package);
    } else {
      this.createPackage();
    }
    this.packageDialog = false;
  }

  private createPackage(): void {
    this.packageService.createPackage(this.file,
      this.packageForm.get('reference').value,
      this.packageForm.get('description').value,
      this.packageForm.get('nbProduct').value,
      this.packageForm.get('price').value,
      this.packageForm.get('soldQuantity').value,
      this.packageForm.get('availableQuantity').value).subscribe({
        next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Package Created', life: 2000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
        complete: () => { }
      })
    this.packages.push(this._package);
  }

  private updatePackage(_package: Package): void {
    if (this.packageToUpdate) {
      this.packageService.updatePackage(_package).subscribe({
        next: (response) => {
          console.log('Package updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Package Updated', life: 2000 });
          this.getPackages();
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
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
    console.log("package selected is " + event);
    this.filteredData = this.packages.filter(item => item.reference.toLowerCase().startsWith(event.toLowerCase()));

  }

  deletePackage(_package: Package): void {
    if (_package) {
      this._package = _package;
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

  toPackage(_package: Package) {
    this.router.navigate(['dashboard/pages/sales/packages', _package.id]);
  }

  onFileSelected(event: any) {
    this.file = <File>event.target.files[0];
  }

  openNew() {
    this._package = {};
    this.submitted = false;
    this.packageDialog = true;
  }

  openDialog(_package?: Package) {
    this.packageToUpdate = _package;
    this.packageService.getPackageById(_package.id);
    this.packageDialog = true;
  }

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
        this._package = {};
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

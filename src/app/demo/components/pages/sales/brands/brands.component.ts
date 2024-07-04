import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Brand } from 'src/app/demo/models/brand';
import { User } from 'src/app/demo/models/user';
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { BrandService } from 'src/app/demo/service/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  providers: [MessageService],
})
export class BrandsComponent implements OnInit, OnDestroy {

  filteredData: Brand[];
  brands: Brand[];
  brand: Brand;
  name: string;
  selectedFile: File;
  brandId: any;

  brandForm: FormGroup;
  brandDialog: boolean = false;
  brandToUpdate: Brand;
  deleteBrandDialog: boolean = false;
  deleteBrandsDialog: boolean = false;
  selectedBrands: Brand[];

  messages: Message[];
  totalElements: number = 0;
  tableLoading: boolean = false;
  submitted: boolean = false;
  isUpdate: boolean = false;

  currentUser:User;
  
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.brandForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      description: [''],
      file: []
    });
  }

  ngOnInit(): void {
    this.getBrands();
    this.getCurrentUser();
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
    return this.currentUser?.role?.active ;
  }

  isActive(): Boolean {
    console.log('currentUser:', this.currentUser);
    return this.currentUser?.status ;
  }

  ngOnDestroy() {
  }

  createBrand() {
    this.brandService.createBrand(this.brandForm.get('name').value, this.brandForm.get('description').value, this.selectedFile).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Brand Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    });
    this.brands.push(this.brandForm.value);
  }

  updateBrand(): void {
    if (this.brandToUpdate && this.brandToUpdate.id ) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.brandForm.get('name')?.value);
      formData.append('description', this.brandForm.get('description')?.value);
      this.brandService.updateBrand(this.brandToUpdate.id, formData).subscribe({
        next: (response) => {
          console.log('Product updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 2000 });
          this.getBrands();
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  save(): void {
    this.submitted = true;
    if (this.brandToUpdate) {
      this.updateBrand();
    } else {
      this.createBrand();
    }
    this.brandDialog = false;
  }


  getBrands() {
    this.tableLoading = true;
    this.brandService.getBrands().subscribe({
      next: (response: any) => {
        this.brands = response;
        this.totalElements = response.totalElements;
        this.filteredData = this.brands;
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

  searchBrands(query: string): void {
    this.filteredData = this.brands.filter(brand =>
      brand.name.toLowerCase().includes(query.toLowerCase()) ||
      brand.description.toLowerCase().includes(query.toLowerCase()));
  }


  deleteBrand(brand: Brand): void {
    if (brand) {
      this.brand = brand;
      this.brandId = brand.id;
      this.deleteBrandDialog = true;
    }
  }

  deleteSelectedBrands(brands: Brand[]) {
    if (brands && brands.length > 0) {
      this.selectedBrands = brands;
      this.deleteBrandsDialog = true;
    }
  }

  viewRoleDetails(brand: Brand) {
    this.router.navigate(['dashboard/pages/sales/brands/', brand.id]);
  }

  openNew() {
    this.brand = {};
    this.submitted = false;
    this.brandDialog = true;
  }

  openDialog(brand?: Brand) {
    this.brandToUpdate = brand;
    this.brandDialog = true;
    this.brandService.getBrandById(brand.id);
    this.brandForm.patchValue({
      id: brand.id,
      name: brand.name,
      description: brand.description,
      //file: brand.image  
    });
    this.selectedFile = null;
  }

  confirmDeleteSelected() {
    if (this.selectedBrands && this.selectedBrands.length > 0) {
      const brandIds = this.selectedBrands.map(brand => brand.id);

      this.brandService.deleteBrands(brandIds).subscribe({
        next: () => {
          this.deleteBrandsDialog = false;
          this.selectedBrands = [];
          console.log('Brands deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The brands have been deleted.' });
          this.getBrands();
        },
        error: (e) => {
          console.error('Error deleting roles', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No brands selected for deletion');

    }
  }

  confirmDelete() {
    this.brandService.deleteBrand(this.brandId).subscribe({
      next: () => {
        this.deleteBrandDialog = false;
        this.brand = {};
        console.log('Brand deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The brand has been deleted.' });
        this.getBrands();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),
    })
  }

  hideDialog() {
    this.brandDialog = false;
    this.submitted = false;
  }

  canAddBrand(): boolean {
    return this.authService.hasPrivilege('Create Brand');
  } 

  canEditBrand(): boolean {
    return this.authService.hasPrivilege('Update Brand');
  } 

  canDeleteBrand(): boolean {
    return this.authService.hasPrivilege('Delete Brand');
  } 

}

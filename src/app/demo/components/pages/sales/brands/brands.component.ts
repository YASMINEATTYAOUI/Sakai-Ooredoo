import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { Brand, BrandDto } from 'src/app/demo/models/brand'; 
import { BrandService } from 'src/app/demo/service/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  providers: [MessageService],
})
export class BrandsComponent implements OnInit, OnDestroy {

  brands: Brand[];
  filteredData: Brand[];
  name: any;

  brandForm: FormGroup; 
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;
  totalElements: number = 0;
  tableLoading: boolean = false;

  brand: Brand;
  brandDialog: boolean = false;
  brandToUpdate: BrandDto;

  deleteBrandDialog: boolean = false;

  deleteBrandsDialog: boolean = false;

  selectedBrands: Brand[] ;

  submitted: boolean = false;
  brandId: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.brandForm = this.formBuilder.group({
      id: [''],
      name:['',[Validators.pattern('^[a-zA-Z0-9 ]*$'),Validators.maxLength(50),Validators.required    ]],
      description:[''],
    });

  }

  ngOnInit(): void {
    this.getBrands();
  }

  ngOnDestroy() {
  }

  save(): void {
    this.submitted = true;
    const data = this.brandForm.value;
    if (this.brandToUpdate) {
      this.updateBrand(data);
    } else {
      this.createBrand(data);
    }
    this.brandDialog = false;
    this.router.navigate(['dashboard/pages/sales/brands']);
    this.getBrands()
  }

  private createBrand(brandDto: BrandDto): void {
    this.brandService.createBrand(brandDto).subscribe({
      next: (response) =>  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Brand Created', life: 2000 }), 
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => {} 
    })
    this.brands.push(this.brand);
  }

  private updateBrand(brandDto: BrandDto): void {
    if (this.brandToUpdate) {
      this.brandService.updateBrand(brandDto).subscribe({
        next: (response) => {
          console.log('Brand updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Brand Updated', life: 2000 });
          this.getBrands();
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => {} // No need to emit here as it's handled in the 'next' and 'error' callbacks
      });
    }
  }

  getBrands() {
    this.tableLoading = true;
    this.brandService.getBrands().subscribe({
      next: (response: any) => {
        this.brands = response; // Extract the 'content' array from the response
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

  searchBrands(event) {
    console.log("brand selected is " +event);
    this.filteredData = this.brands.filter(item => item.name.toLowerCase().startsWith(event.toLowerCase()));
  
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

  //navigation to details
  toBrand(brand: BrandDto) {
    this.router.navigate(['dashboard/products/', brand.id]);
  }

  openNew() {
    this.brand = {};
    this.submitted = false;
    this.brandDialog = true;
  }

  openDialog(brand?: BrandDto) {
    this.brandToUpdate = brand;
    this.brandDialog = true;
  }

  confirmDeleteSelected() {
    if (this.selectedBrands && this.selectedBrands.length > 0) {
      const brandIds = this.selectedBrands.map(brand => brand.id);

      this.brandService.deleteBrands(brandIds).subscribe({
        next: () => {
          this.deleteBrandsDialog = false;
          this.selectedBrands = []; // Clear the roles to delete
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
      // Show a message to inform the user that no roles are selected for deletion
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

}

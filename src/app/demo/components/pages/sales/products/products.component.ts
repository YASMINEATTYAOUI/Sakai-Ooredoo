import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Brand } from 'src/app/demo/models/brand';
import { Category } from 'src/app/demo/models/category';
import { Product } from 'src/app/demo/models/product';
import { BrandService } from 'src/app/demo/service/services/brand.service';
import { CategoryService } from 'src/app/demo/service/services/category.service';
import { ProductService } from 'src/app/demo/service/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [MessageService],
})

export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredData: Product[];
  name: any;

  file: File;

 
  product: Product;

  selectedBrandId: Brand;
  brands: any[] = [];
  selectedCategoryId: Category;
  categories: any[] = [];


  selectedCategoryId: Category;
  categories: any[] = [];



  productForm: FormGroup;


  productDialog: boolean = false;
  productToUpdate: Product;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  selectedProducts: Product[];

  messages: Message[];
  totalElements: number = 0;
  tableLoading: boolean = false;
  submitted: boolean = false;
  productId: any;
  selectedFile: File;
  imageUrl: string | ArrayBuffer;
  
  

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router) {
    this.productForm = this.formBuilder.group({
      id: [''],
      reference: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      description: [''],
      price: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
      soldQuantity: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
      availableQuantity: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
      brand: [null, Validators.required],
      category: [null, Validators.required],
      file: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.loadBrands();
    this.loadCategories();
  }

  ngOnDestroy() {
  }

 
  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  loadBrands() {
    this.brandService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  brandSelectedEvent(event: any) {
    this.product.brand = event.value;
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  
  categorySelectedEvent(event: any) {
    this.product.category = event.value;
  }
  
  save(): void {
    
    this.submitted = true;
    if (this.productToUpdate) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
    this.productDialog = false;
  }
  createProduct(): void {
    
    if (this.productForm.invalid ) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('reference', this.productForm.get('reference')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('soldQuantity', this.productForm.get('soldQuantity')?.value);
    formData.append('availableQuantity', this.productForm.get('availableQuantity')?.value);
    formData.append('brand', this.productForm.get('brand')?.value.id);
    formData.append('category', this.productForm.get('category')?.value.id);

    this.productService.createProduct(formData).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    });
  } else {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out the form correctly!' });
  }
   error => {
      console.error('Error creating product:', error);
    };
  }

  private updateProduct(): void {
    if (this.productToUpdate.id) {
      this.productService.updateProduct(this.productForm.get('id').value, this.selectedFile,
        this.productForm.get('reference').value,
        this.productForm.get('description').value,
        this.productForm.get('price').value,
        this.productForm.get('soldQuantity').value,
        this.productForm.get('availableQuantity').value).subscribe({
          next: (response) => {
            console.log('Product updated successfully');
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 2000 });
            this.getProducts();
          },
          error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
          complete: () => { }
        });
    }
  }

  getProducts() {
    this.tableLoading = true;
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response;
        this.totalElements = response.totalElements;
        this.filteredData = this.products;
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

  searchProducts(event) {
    this.filteredData = this.products.filter(item => 
      item.reference.toLowerCase().startsWith(event.toLowerCase()));
      
  }

  deleteProduct(product: Product): void {
    if (product) {
      this.product = product;
      this.productId = product.id;
      this.deleteProductDialog = true;
    }
  }

  deleteSelectedProducts(products: Product[]) {
    if (products && products.length > 0) {
      this.selectedProducts = products;
      this.deleteProductsDialog = true;
    }
  }

  toProduct(product: Product) {
    this.router.navigate(['dashboard/pages/sales/packages', product.id]);
  }

  

  openNew() {
    this.product = new Product;
    this.submitted = false;
    this.productDialog = true;
    console.log("opened");
  }

  openDialog(product?: Product) {
    this.productToUpdate = product;
    this.productDialog = true;
    this.productService.getProductById(product.id);
    this.productForm.patchValue({
      id: product.id,
      reference: product.reference,
      description: product.description,
      file: product.image,
      price:product.price,
      soldQuantity:product.soldQuantity,
      availableQuantity:product.availableQuantity,
    });
  }

  confirmDeleteSelected() {
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      const productIds = this.selectedProducts.map(product => product.id);

      this.productService.deleteProducts(productIds).subscribe({
        next: () => {
          this.deleteProductsDialog = false;
          this.selectedProducts = [];
          console.log('Products deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The products have been deleted.' }); // Changed "Packages" to "Products"
          this.getProducts();
        },
        error: (e) => {
          console.error('Error deleting products', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No products selected for deletion');
    }
  }

  confirmDelete() {
    this.productService.deleteProduct(this.productId).subscribe({
      next: () => {
        this.deleteProductDialog = false;
        this.product = {};
        console.log('Product deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The product has been deleted.' }); // Changed "Package" to "Product"
        this.getProducts();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  onFileSelectedd(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Update selectedFile with the selected file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

}

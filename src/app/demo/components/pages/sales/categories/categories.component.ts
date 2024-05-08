import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message} from 'primeng/api';
import { Category, CategoryDto } from 'src/app/demo/models/category'; 
import { CategoryService } from 'src/app/demo/service/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  providers: [MessageService],
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Category[]; 
  filteredData: Category[]; 
  name: any;

  categoryForm: FormGroup; 
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;
  totalElements: number = 0;
  tableLoading: boolean = false;

  category: Category; 
  categoryDialog: boolean = false; 
  categoryToUpdate: CategoryDto;
  deleteCategoryDialog: boolean = false;

  deleteCategoriesDialog: boolean = false; 

  selectedCategories: Category[];

  submitted: boolean = false;
  categoryId: any;

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService, 
    private messageService: MessageService,
    private router: Router
  ) {
    this.categoryForm = this.formBuilder.group({
      id: [''],
      name:['',[Validators.pattern('^[a-zA-Z0-9 ]*$'),Validators.maxLength(50),Validators.required    ]],
      description:[''],
    });
  }

  ngOnInit(): void {
    this.getCategories(); 
  }

  ngOnDestroy() {
  }

  save(): void {
    this.submitted = true;
    const data = this.categoryForm.value;
    if (this.categoryToUpdate) {
      this.updateCategory(data); 
    } else {
      this.createCategory(data); 
    }
    this.categoryDialog = false;
    this.router.navigate(['dashboard/pages/sales/categories']); 
    this.getCategories();
  }

  private createCategory(categoryDto: CategoryDto): void { 
    this.categoryService.createCategory(categoryDto).subscribe({ 
      next: (response) =>  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 2000 }), 
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => {} 
    })
    this.categories.push(this.category); 
  }

  private updateCategory(categoryDto: CategoryDto): void {
    if (this.categoryToUpdate) {
      this.categoryService.updateCategory(categoryDto).subscribe({ 
        next: (response) => {
          console.log('Category updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 2000 });
          this.getCategories(); 
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => {} 
      });
    }
  }

  getCategories() { 
    this.tableLoading = true;
    this.categoryService.getCategories().subscribe({ 
      next: (response: any) => {
        this.categories = response; 
        this.totalElements = response.totalElements;
        this.filteredData = this.categories; 
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

  searchCategories(event) { 
    console.log("category selected is " +event);
    this.filteredData = this.categories.filter(item => item.name.toLowerCase().startsWith(event.toLowerCase()));
  
  }

  deleteCategory(category: Category): void { 
    if (category) {
      this.category = category; 
      this.categoryId = category.id; 
      this.deleteCategoryDialog = true;
    }
  }

  deleteSelectedCategories(categories: Category[]) { 
    if (categories && categories.length > 0) {
      this.selectedCategories = categories; 
      this.deleteCategoriesDialog = true; 
    }
  }

  //navigation to details
  toCategory(category: CategoryDto) { 
    this.router.navigate(['dashboard/pages/sales/categories', category.id]); 
  }

  openNew() {
    this.category = {}; 
    this.submitted = false;
    this.categoryDialog = true;
  }

  openDialog(category?: CategoryDto) {
    this.categoryToUpdate = category; 
    this.categoryDialog = true;
  }

  confirmDeleteSelected() {
    if (this.selectedCategories && this.selectedCategories.length > 0) { 
      const categoryIds = this.selectedCategories.map(category => category.id); 

      this.categoryService.deleteCategories(categoryIds).subscribe({ 
        next: () => {
          this.deleteCategoriesDialog = false;
          this.selectedCategories = [];
          console.log('Categories deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The categories have been deleted.' });
          this.getCategories(); 
        },
        error: (e) => {
          console.error('Error deleting categories', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No categories selected for deletion'); 
      
    }
  }

  confirmDelete() {
    this.categoryService.deleteCategory(this.categoryId).subscribe({
      next: () => {
        this.deleteCategoryDialog = false; 
        this.category = {}; 
        console.log('Category deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The category has been deleted.' });
        this.getCategories(); 
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),

    })
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

}

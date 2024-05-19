import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService, Message } from 'primeng/api';
import { Color } from 'src/app/demo/models/color';
import { ColorService } from 'src/app/demo/service/services/color.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  providers: [MessageService],
})

export class ColorsComponent implements OnInit, OnDestroy {
  colors: Color[];
  filteredData: Color[];
  name: any;

  colorForm: FormGroup;
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;

  totalElements: number = 0;
  tableLoading: boolean = false;

  color: Color;
  colorDialog: boolean = false;
  colorToUpdate: Color;

  deleteColorDialog: boolean = false;

  deleteColorsDialog: boolean = false;

  selectedColors: Color[];

  submitted: boolean = false;

  colorId: any;
  showColorDetailsPopup: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.colorForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],
      colorCode: [''],
    });

  }

  ngOnInit(): void {
    this.getColors();
  }

  ngOnDestroy() {
  }

  save(): void {
    this.submitted = true;
    const data = this.colorForm.value;
    if (this.colorToUpdate) {
      this.updateColor(data);
    } else {
      this.createColor(data);
    }
    this.colorDialog = false;
    this.getColors();
  }

  private createColor(color: Color): void {
    this.colorService.createColor(color).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Color Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    });
    this.colors.push(this.color);
  }

  private updateColor(color: Color): void {
    if (this.colorToUpdate) {
      this.colorService.updateColor(color).subscribe({
        next: (response: any) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Color Updated', life: 2000 }),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
      });
    }
  }

  getColors() {
    this.tableLoading = true;
    this.colorService.getColors().subscribe({
      next: (response: any) => {
        this.colors = response; 
        this.totalElements = response.totalElements;
        this.filteredData = this.colors;

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

  searchColors(event) {
    console.log("color selected is " + event);
    this.filteredData = this.colors.filter(item => item.name.toLowerCase().startsWith(event.toLowerCase()));
  }

  deleteColor(color: Color): void {
    if (color) {
      this.color = color;
      this.colorId = color.id;
      this.deleteColorDialog = true;
    }
  }

  deleteSelectedColors(colors: Color[]): void {
    if (colors && colors.length > 0) {
      this.selectedColors = colors;
      this.deleteColorsDialog = true;
    }
  }

  // Navigation to details
  toColor(color: Color) {
    this.router.navigate(['dashboard/products/', color.id]);
  }

  openNew() {
    this.color = {};
    this.submitted = false;
    this.colorDialog = true;
  }

  openDialog(color?: Color) {
    this.colorToUpdate = color;
    this.colorDialog = true;
  }

  confirmDeleteSelected() {
    if (this.selectedColors && this.selectedColors.length > 0) {
      const colorIds = this.selectedColors.map(color => color.id);

      this.colorService.deleteColors(colorIds).subscribe({
        next: () => {
          this.deleteColorsDialog = false;
          this.selectedColors = [];
          console.log('Colors deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The colors have been deleted.' });
          this.getColors();
        },
        error: (e) => {
          console.error('Error deleting colors', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No colors selected for deletion');
      
    }
  }

  confirmDelete() {
    this.colorService.deleteColor(this.colorId).subscribe({
      next: () => {
        this.deleteColorDialog = false;
        this.color = {};
        console.log('Color deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The color has been deleted.' });
        this.getColors();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),

    });
  }

  hideDialog() {
    this.colorDialog = false;
    this.submitted = false;
  }
}

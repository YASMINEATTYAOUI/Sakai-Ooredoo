import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { Theme } from 'src/app/demo/models/theme';
import { ThemeService } from 'src/app/demo/service/services/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  providers: [MessageService],
})
export class ThemesComponent implements OnInit, OnDestroy {

  themes: Theme[];
  filteredData: Theme[];
  name: any;

  themeForm: FormGroup;
  isUpdate: boolean = false;

  messages: Message[];
  typing: boolean;
  totalElements: number = 0;
  tableLoading: boolean = false;

  theme: Theme;
  themeDialog: boolean = false;
  themeToUpdate: Theme;
  deleteThemeDialog: boolean = false;

  deleteThemesDialog: boolean = false;

  selectedThemes: Theme[];

  submitted: boolean = false;
  themeId: any;

  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.themeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50), Validators.required]],

      characteristic: [''],
    });
  }

  ngOnInit(): void {
    this.getThemes();
  }

  ngOnDestroy() {
  }

  private createTheme(theme: Theme): void {
    this.themeService.createTheme(theme).subscribe({
      next: (response) => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Theme Created', life: 2000 }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Creation Failed' }),
      complete: () => { }
    });
    this.themes.push(this.theme);
  
  }
 
  private updateTheme(theme: Theme): void {
    if (theme.id) {
      this.themeService.updateTheme(theme.id, theme).subscribe({
        next: (response) => {
          console.log('Theme updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Theme Updated', life: 2000 });
          this.getThemes();
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { }
      });
      this.themes.push(this.theme);
    }
  }

  save(): void {
    this.submitted = true;
    const data = this.themeForm.value;
    if (this.themeToUpdate) {
      this.updateTheme(data);
    } else {
      this.createTheme(data);
    }
    this.themeDialog = false;
  }

  getThemes() {
    this.tableLoading = true;
    this.themeService.getThemes().subscribe({
      next: (response: any) => {
        this.themes = response;
        this.totalElements = response.totalElements;
        this.filteredData = this.themes;
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

  searchThemes(event) {
    console.log("theme selected is " + event);
    this.filteredData = this.themes.filter(item => item.name.toLowerCase().startsWith(event.toLowerCase()));
  }

  deleteTheme(theme: Theme): void {
    if (theme) {
      this.theme = theme;
      this.themeId = theme.id;
      this.deleteThemeDialog = true;
    }
  }

  deleteSelectedThemes(themes: Theme[]) {
    if (themes && themes.length > 0) {
      this.selectedThemes = themes;
      this.deleteThemesDialog = true;
    }
  }

  toTheme(theme: Theme) {
    this.router.navigate(['dashboard/pages/sales/themes', theme.id]);
  }

  openNew() {
    this.theme = {};
    this.submitted = false;
    this.themeDialog = true;
  }

  openDialog(theme?: Theme) { 
    this.themeToUpdate = theme;
    this.themeDialog = true;

    this.themeService.getThemeById(theme.id);
    this.themeForm.patchValue({
      id: theme.id,
      name: theme.name,
      characteristic: theme.name,
    });
  }

  confirmDeleteSelected() {
    if (this.selectedThemes && this.selectedThemes.length > 0) {
      const themeIds = this.selectedThemes.map(theme => theme.id);

      this.themeService.deleteThemes(themeIds).subscribe({
        next: () => {
          this.deleteThemesDialog = false;
          this.selectedThemes = [];
          console.log('Themes deleted successfully');
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The themes have been deleted.' });
          this.getThemes();
        },
        error: (e) => {
          console.error('Error deleting themes', e);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' });
        }
      });
    } else {
      console.warn('No themes selected for deletion');

    }
  }

  confirmDelete() {
    this.themeService.deleteTheme(this.themeId).subscribe({
      next: () => {
        this.deleteThemeDialog = false;
        this.theme = {};
        console.log('Theme deleted successfully');
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'The theme has been deleted.' });
        this.getThemes();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deletion Failed' }),

    });
  }

  hideDialog() {
    this.themeDialog = false;
    this.submitted = false;
  }

}

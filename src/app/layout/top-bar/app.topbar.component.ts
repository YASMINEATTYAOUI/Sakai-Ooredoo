import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  items!: MenuItem[];
  refreshToken: string;

  currentUser: any;

  languageMenuVisible = false;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;


  constructor(
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthenticationService,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/auth/login']);
  }

  toggleLanguageMenu() {
    this.languageMenuVisible = !this.languageMenuVisible;
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      data => this.currentUser = data,
      error => console.error('Error fetching user data', error));
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.languageMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.language-menu') &&
      !(event.target as HTMLElement).closest('.layout-topbar-button')) {
      this.languageMenuVisible = false;
    }
  }

}

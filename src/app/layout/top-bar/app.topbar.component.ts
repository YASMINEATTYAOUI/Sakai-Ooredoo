import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];
    refreshToken: string;

    currentUser: any;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;


    constructor(
      private router : Router,
        public layoutService: LayoutService,
        private authService: AuthenticationService,
        private translate: TranslateService
    ) { }

    logout(){
      localStorage.removeItem("token");
      this.router.navigate(['/auth/login']);
    }

    ngOnInit()  {
      this.authService.getCurrentUser().subscribe(
        data => this.currentUser = data,
        error => console.error('Error fetching user data', error));
    }

    switchLanguage(language: string) {
      this.translate.use(language);
    }

}

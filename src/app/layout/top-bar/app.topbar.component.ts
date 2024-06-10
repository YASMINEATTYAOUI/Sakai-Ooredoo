import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { Router } from '@angular/router';

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
        private authService: AuthenticationService
    ) { }

    logout(){
      localStorage.removeItem("token");
      this.router.navigate(['/auth/login']);
    }

    ngOnInit()  {
      this.authService.getCurrentUser().subscribe(
        data => this.currentUser = data,
        error => console.error('Error fetching user data', error));
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      
    }
/*
    onLogout(refreshToken: string): void {
        this.authService.logout(refreshToken).subscribe({
          next: () => {
            // Handle successful logout, such as clearing user data or navigating to the login page
            console.log('Logout successful');
          },
          error: (error) => {
            // Handle error, such as displaying an error message
            console.error('Logout failed', error);
          }
        });
      }
      */
}

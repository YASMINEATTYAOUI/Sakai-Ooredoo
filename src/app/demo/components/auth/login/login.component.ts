import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { Router } from '@angular/router';
import axios from 'axios';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
   providers: [MessageService] 
})
 
export class LoginComponent implements OnInit {
  
    valCheck: string[] = ['remember'];

    username!: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private messageService : MessageService
    ) { }

  ngOnInit(): void {
    // test si utilisateur connecter
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('token') != undefined
    ) {
      // redirection
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    axios
      .post("http://localhost:8089/api/auth/login?username=" + this.username + "&password=" + this.password, null)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.headers.access_token);
        console.log(res.headers.access_token)
        // redirection vers dashboard
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
        this.router.navigate(['/auth/unauthorized']);
      });
  }
}


import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';

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

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private router: Router
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

  login(loginForm: NgForm) {
    console.log(loginForm.value);
    console.log('Before request');
    axios
      .post(`http://localhost:8080/api/auth/login`, loginForm.value)
      .then((res) => {
        console.log(res.data);
        // sauvegarder accessToken , user
        // localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.accessToken);
        // redirection vers dashboard
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log('Erreur');
      });
    console.log('After response');
  }
}

/*
constructor(
  public layoutService: LayoutService,
  
) { }

email = '';
  password = '';
  authService = inject(AuthenticationService);
  router = inject(Router);

  login(event: Event) {
    event.preventDefault();
    console.log(`Login: ${this.email} / ${this.password}`);
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe(() => {
        alert('Login success!');
        this.router.navigate(['/']);
      });
  }
}

*/
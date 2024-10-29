import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Intentando iniciar sesión con:', this.username, this.password); // Para diagnóstico
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error('Login fallido', err),
    });
  }
}

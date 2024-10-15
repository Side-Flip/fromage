import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({ 
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService,) {}

  showNavbar(): boolean {
    return this.router.url !== '/login'; // Oculta en '/login'
  }

  isHomeProductPage(): boolean {
    return this.router.url === '/home/product';
  }

  navigateTo(page: string): void {
    if (page === 'home') {
      this.router.navigate(['/home']);
    } else if (page === 'sales') {
      this.router.navigate(['/sales']); 
    }
  }

  logout(): void{
    this.authService.logout()

  } 
}

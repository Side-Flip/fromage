import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({ 
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService,) {}

  showNavbar(): boolean {
    return this.router.url !== '/login'; // Oculta en la ruta '/login'
  }

  isOnPage(): boolean {
    const validRoutes = ['/home/product', '/home/invoice', '/home/report', '/home/sale'];
    return validRoutes.includes(this.router.url);
  }

  isOnPageSale(): boolean {
    const validRoutes = ['/home/product', '/home/invoice', '/home/report'];
    return validRoutes.includes(this.router.url);
  }

  navigateTo(page: string): void {
    if (page === 'home') {
      this.router.navigate(['/home']);
    } else if (page === 'sale') {
      this.router.navigate(['/home/sale']); 
    }
  }

  logout(): void{
    this.authService.logout()

  } 
}

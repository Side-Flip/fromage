import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:8000/api/token/';
  private tokenKey = 'authToken';
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(this.LOGIN_URL, { username, password })
      .pipe(
        tap({
          next: (response) => {
            console.log('Respuesta completa del servidor:', response); // Muestra la respuesta completa
            if (response.access) { // Asegúrate de que el token esté en "access" o la clave correcta
              console.log('Token recibido:', response.access);
              this.setToken(response.access);
            } else {
              console.warn('No se recibió un token en la respuesta');
            }
          },
          error: (error) => {
            console.error('Error en la autenticación', error);
          },
        })
      );
  }
  

  private setToken(token: string): void {
    console.log('Guardando token:', token); 
    localStorage.setItem(this.tokenKey, token);
  }
  

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}

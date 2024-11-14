
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceReportService {
  private API_URL = 'http://localhost:8000/reporte/facturas/';
  private sucursalesURL = 'http://localhost:8000/reporte/sucursales/';

  constructor(private http: HttpClient) {}

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
        return localStorage.getItem('authToken');
    }
    return null;
}

  getData(option: string, startDate: string, endDate: string, sucursal: string): Observable<any> {
    const token = this.getAuthToken();
    if (!token) {
        console.error("Token de autenticación no encontrado. Verifica que el usuario haya iniciado sesión.");
        return throwError(() => new Error("Token de autenticación no encontrado."));
    }
    const params = { option, fecha_inicio: startDate, fecha_fin: endDate, sucursal };
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(this.API_URL, { params, headers });
}

  getSucursales(): Observable<any[]> {
    const token = this.getAuthToken();
    if (!token) {
      console.error("Token de autenticación no encontrado. Verifica que el usuario haya iniciado sesión.");
      return throwError(() => new Error("Token de autenticación no encontrado."));
    }
  
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    return this.http.get<any[]>(this.sucursalesURL, { headers });
  }

  getInvoiceDetail(numeroFactura: number): Observable<any> {
    const token = this.getAuthToken();
    if (!token) {
      console.error("Token de autenticación no encontrado. Verifica que el usuario haya iniciado sesión.");
      return throwError(() => new Error("Token de autenticación no encontrado."));
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(`http://localhost:8000/reporte/factura-detalle/${numeroFactura}/`, { headers });
  }

  
}
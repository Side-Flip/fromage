// src/app/core/services/search-invoice.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  no_factura: string;
  fecha: string;
  documento_cliente: string;
  nombre_cliente: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchInvoiceService {
  private apiUrl = 'http://localhost:8000/api/factura/'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

 
  getInvoiceByNumber(invoiceNumber: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}${invoiceNumber}/`);
  }

 
  getInvoicesByDateRange(startDate: string, endDate: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}?start_date=${startDate}&end_date=${endDate}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id_producto: number;
  nombre_producto: string;
  precio_producto: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductTableService {

  private PRODUCT_URL = ''; 

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.PRODUCT_URL);
  }
}
 
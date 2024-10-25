import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {
  private PRODUCT_URL = 'http://localhost:8000/api/productos/';

  constructor(private http: HttpClient) {}

  public getProducts(codigo?: number, nombre?: string, precio?: number, stock?: number): Observable<any> {
    let params = new HttpParams();

    if (nombre) {
      params = params.set('nombre', nombre);
    }else if (precio) {
      params = params.set('precio', precio.toString());
    }else if (stock) {
      params = params.set('stock', stock.toString());
    }else if (codigo){
      params = params.set('codigo', codigo.toString());
    }

    return this.http.get(this.PRODUCT_URL, { params });
  }
}

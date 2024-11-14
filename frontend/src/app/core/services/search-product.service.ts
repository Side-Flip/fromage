import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {
  private PRODUCT_URL = 'http://localhost:8000/venta/productos/';

  constructor(private http: HttpClient) {}

  public getProducts(query?: string): Observable<any> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    return this.http.get(this.PRODUCT_URL, { params });
  }
}

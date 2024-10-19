import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceReportService {
  private API_URL = 'http://localhost:8000/api/data';
  
  constructor(private http: HttpClient) { }

  getData(option: string, startDate: string, endDate: string): Observable<any> {
   
    const body = {
      option,
      start_date: startDate,
      end_date: endDate
    };

    
    return this.http.post<any>(this.API_URL, body);
  }
}

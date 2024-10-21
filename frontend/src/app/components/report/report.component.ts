import { Component } from '@angular/core';
import { InvoiceReportService } from '../../core/services/invoice-report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  selectedOption: string = ''; 
  startDate: string = '';
  endDate: string = '';  
  results: any[] = []; 

  constructor(private invoiceReportService: InvoiceReportService) {}

  onSubmit(): void {

    if (this.startDate && this.endDate) {

      this.invoiceReportService.getData(this.selectedOption, this.startDate, this.endDate).subscribe({
        next: (data) => {
          this.results = data; 
        },
        error: (err) => {
          console.error('Error al obtener los datos', err);
        }
      });
    } else {
      console.error('Las fechas son obligatorias');
    }
  }
}

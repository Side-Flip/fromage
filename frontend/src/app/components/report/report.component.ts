import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InvoiceReportService } from '../../core/services/invoice-report.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailDialogComponent } from '../../dialogs/detail-dialog/detail-dialog.component';
import { CdkTableModule } from '@angular/cdk/table';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    CdkTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  dataSource = new MatTableDataSource<any>([]);
  sucursales: any[] = [];

  displayedColumns: string[] = [
   'sucursal_nombre', 'numero_factura', 'fecha', 'cliente_nombre', 'total', 'detalle'
  ];
  columnHeaders: { [key: string]: string } = {  
    sucursal_nombre: 'Sucursal',
    numero_factura: 'No. Factura',  
    fecha: 'Fecha',  
    cliente_nombre: 'Cliente',  
    total: 'Total',  
    detalle: 'Detalle',};

  constructor(
    private invoiceReportService: InvoiceReportService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  selectedOption: string = 'facturas';
  selectedSucursal: string[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  

  onSubmit(): void {
    if (this.startDate && this.endDate && this.selectedSucursal.length > 0) {
      const sucursalesString = this.selectedSucursal.join(',');
    
      const startDateFormatted = this.startDate.toISOString().split('T')[0];
      const endDateFormatted = this.endDate.toISOString().split('T')[0];
    
      this.invoiceReportService
        .getData(
          this.selectedOption,
          startDateFormatted,
          endDateFormatted,
          sucursalesString
        )
        .subscribe({
          next: (data) => {
            
            const updatedData = data.map((numero_factura: any) => ({
              ...numero_factura,
              sucursal_id: this.selectedSucursal[0] // Ajusta según tu necesidad
            }));
  
            this.dataSource.data = updatedData;
            console.log('Datos de facturas con ID de sucursal:', updatedData);
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error al obtener los datos', err);
          },
        });
    } else {
      console.error('Las fechas y al menos una sucursal son obligatorias');
    }
  }
  
  

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  loadSucursales(): void {
    const token = this.getAuthToken();

    if (!token) {
      console.error(
        'Token de autenticación no encontrado. Por favor, inicia sesión.'
      );
      return;
    }

    this.invoiceReportService.getSucursales().subscribe({
      next: (data) => {
        this.sucursales = data;
      },
      error: (err) => {
        console.error('Error al cargar las sucursales', err);
      },
    });
  }

  ngOnInit() {
    this.loadSucursales();
  }

  getSucursalNombre(sucursalId: string): string {
    const sucursal = this.sucursales.find(s => s.id === sucursalId);
    return sucursal ? sucursal.nombre : 'Sucursal Desconocida';
  }
  
  openInvoiceDetail(numeroFactura: number): void {
    const sucursalSeleccionada = this.sucursales.find(
      (sucursal) => sucursal.id === this.selectedSucursal[0]
    );
    const sucursalNombre = sucursalSeleccionada ? sucursalSeleccionada.nombre : 'Sucursal Desconocida';
    
    const dialogData = { numeroFactura, sucursalNombre };
    
    console.log('Datos enviados al diálogo:', dialogData); 
  
    this.dialog.open(DetailDialogComponent, {
      data: dialogData
    });
  }
  
}
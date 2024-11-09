import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SearchInvoiceService, Invoice } from '../../core/services/search-invoice.service';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

type ColumnKey = 'noFactura' | 'fecha' | 'documentoCliente' | 'nombreCliente' | 'detalle';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule, 
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ], 
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements AfterViewInit {
  data: Invoice[] = [];
  
  displayedColumns: ColumnKey[] = ['noFactura', 'fecha', 'documentoCliente', 'nombreCliente', 'detalle'];

  columnHeaders: { [key in ColumnKey]: string } = {
    'noFactura': 'No. Factura',
    'fecha': 'Fecha',
    'documentoCliente': 'Documento cliente',
    'nombreCliente': 'Nombre cliente',
    'detalle': 'Detalle'
  };
  
  dataSource = new MatTableDataSource<Invoice>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private invoiceService: SearchInvoiceService) {}  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadInvoices(); 
    this.dataSource.filterPredicate = (data: Invoice, filter: string) => {
      return data.no_factura.toLowerCase().includes(filter) ||
             data.nombre_cliente.toLowerCase().includes(filter);
    };
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices) => {
        this.data = invoices;
        this.dataSource.data = this.data;  
        console.log('Facturas cargadas:', this.data);  
      },
      error: (err) => {
        console.error('Error al cargar las facturas', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetail(invoice: Invoice) {
    console.log('Ver detalle para la factura:', invoice);
  }
}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { SearchProductService } from '../../core/services/search-product.service';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatIcon,
    MatPaginator, 
    GenericTableComponent, 
    MatSelectModule, 
    FormsModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatTableModule, 
    MatInputModule, 
    MatButtonModule 
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit {
  data: any[] = [];
  
  displayedColumns = ['Codigo', 'Nombre', 'Precio', 'Stock'];
  
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: SearchProductService) {}  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadProducts(); 
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.data = products.map((product: any) => ({
          Codigo: product.id_producto,
          Nombre: product.nombre_producto,
          Precio: product.precio_producto,
          Stock: product.stock
        }));
        this.dataSource.data = this.data;  
        console.log('Productos cargados:', this.data);  
      },
      error: (err) => {
        console.error('Error al cargar los productos', err);
      }
    });
  }
}

import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
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
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

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
    CommonModule,         
    FormsModule,   
    MatButtonModule 
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, AfterViewInit {
  data: any[] = [];
  displayedColumns = ['Codigo', 'Nombre', 'Precio', 'Stock'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: SearchProductService) {}  

  private searchSubject = new Subject<string>();
  
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(query => {
      this.productService.getProducts(query).subscribe({
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.productService.getProducts(query).subscribe({
      next: (products) => {
        this.data = products.map((product: any) => ({
          Codigo: product.id,
          Nombre: product.nombre,
          Precio: product.precio,
          Stock: product.stock
        }));
        this.dataSource.data = this.data;
       
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        console.error('Error al cargar los productos', err);
      }
    });
  }
}
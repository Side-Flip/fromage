import { Component, OnInit } from '@angular/core';
import { SearchProductService } from '../../core/services/search-product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit {

  formattedDate: string = '';
  currentTime: string = '';

  ngOnInit(): void {
    this.setCurrentDateTime();
    this.loadProducts();
  }

  setCurrentDateTime(): void {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    this.formattedDate = currentDate.toLocaleDateString('es-ES', options);// Formatear la fecha con el mes en texto
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Formatear la hora como 'HH:MM'
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  data: any[] = [];
  filteredData: any[] = [];
  searchText: string = ''; // Para almacenar el texto de búsqueda
  selectedFilter: string = 'nombre'; // Para almacenar el filtro seleccionado

  constructor(private productService: SearchProductService) {}


  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.data = products.map((product: any) => ({
          Codigo: product.id_producto,
          Nombre: product.nombre_producto,
          Precio: product.precio_producto,
          Stock: product.stock
        }));
        // Inicialmente muestra solo los primeros 10 productos
        this.filteredData = this.data.slice(0, 10);
        console.log('Productos cargados:', this.data);
      },
      error: (err) => {
        console.error('Error al cargar los productos', err);
      }
    });
  }

  filterProducts() {
    const filterValue = this.searchText.toLowerCase();
    if (this.selectedFilter === 'nombre') {
      this.filteredData = this.data.filter(product =>
        product.Nombre.toLowerCase().includes(filterValue)
      );
    } else if (this.selectedFilter === 'id') {
      this.filteredData = this.data.filter(product =>
        product.Codigo.toString().includes(filterValue)
      );
    }
  }

  

}

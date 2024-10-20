import { Component, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';


const ELEMENT_DATA: any[] = [
{Código: 1, Nombre: 'Queso Doble Crema', Precio: 8000, Stock: 60},
{Código: 2, Nombre: 'Queso Mozzarella', Precio: 9500, Stock: 32},
{Código: 3, Nombre: 'Queso Campesino', Precio: 6000, Stock: 30},
{Código: 4, Nombre: 'Queso Criollo', Precio: 7500, Stock: 17},
{Código: 5, Nombre: 'Queso Costeño', Precio: 8000, Stock: 65},
{Código: 6, Nombre: 'Queso Pera', Precio: 11000, Stock: 40},
{Código: 7, Nombre: 'Queso Saravena', Precio: 12000, Stock: 30},
{Código: 8, Nombre: 'Queso Gouda', Precio: 15000, Stock: 35},
{Código: 9, Nombre: 'Queso Parmesano', Precio: 14000, Stock: 35},
{Código: 10, Nombre: 'Queso Gruyere', Precio: 17000, Stock: 29},
{Código: 11, Nombre: 'Queso Camembert', Precio: 17500, Stock: 24},
{Código: 12, Nombre: 'Queso Provolone', Precio: 13000, Stock: 33},
{Código: 13, Nombre: 'Queso Emmental', Precio: 14000, Stock: 24},
{Código: 14, Nombre: 'Queso Brie', Precio: 16000, Stock: 29},
{Código: 15, Nombre: 'Queso Cottage', Precio: 15000, Stock: 28},
{Código: 16, Nombre: 'Queso Feta', Precio: 15000, Stock: 32},
{Código: 17, Nombre: 'Queso Suizo', Precio: 20000, Stock: 15},
{Código: 18, Nombre: 'Queso Izmir Tulum', Precio: 18000, Stock: 35},
{Código: 19, Nombre: 'Queso Gorgonzola', Precio: 20000, Stock: 15},
{Código: 20, Nombre: 'Queso Port Salut', Precio: 17500, Stock: 35}

];
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatIcon, MatPaginator, GenericTableComponent, MatSelectModule, FormsModule,MatIconModule,MatFormFieldModule, MatTableModule, MatInputModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  data = ELEMENT_DATA;
  filteredData = ELEMENT_DATA; 
  displayedColumns = ['Código', 'Nombre', 'Precio', 'Stock'];
  searchTerm: string = '';
  dataSource =  new MatTableDataSource(ELEMENT_DATA);
  //displayedColumns = input.required<string['Código', 'Nombre', 'Precio', 'Stock']>();
  //data = input.required<T[]>();
  //dataSource = new MatTableDataSource<T>();

  /*ngOnInit(): void {
    this.dataSource.data = this.data();
  }*/
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

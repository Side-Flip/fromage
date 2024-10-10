import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items = [
    { label: 'Productos', active: false },
    { label: 'Venta', active: false },
    { label: 'Reporte', active: false },
    { label: 'Facturas', active: false }
  ];

  onBoxClick(selectedItem: any) {
    this.items.forEach(item => item.active = false); // Reinicia todos los elementos
    selectedItem.active = true; // Activa el elemento clicado
  }
}

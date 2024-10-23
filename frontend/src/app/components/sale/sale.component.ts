import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {
  currentDate: string = '';
  currentTime: string = '';

  ngOnInit(): void {
    this.setCurrentDateTime();
  }

  setCurrentDateTime(): void {
    const currentDate = new Date();
    
    // Formatear la fecha como 'YYYY-MM-DD'
    this.currentDate = currentDate.toISOString().split('T')[0];
    
    // Formatear la hora como 'HH:MM'
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
    
  }

}

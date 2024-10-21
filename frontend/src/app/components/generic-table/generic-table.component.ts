import { Component, input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent<T> implements OnInit{
  
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>();

  ngOnInit(): void {
    this.dataSource.data = this.data();
  }
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

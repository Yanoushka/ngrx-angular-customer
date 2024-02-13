import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Customer } from '../../../_model/customer.model';
import { MaterialModule } from '../../../_module/material.module';
import { deleteCustomer, loadCustomer } from '../../_store/customer/customer.actions';
import { getCustomerList } from '../../_store/customer/customer.selector';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  public customerData!: Customer[];
  public dataSource: any;
  public displayColumns: string[] = ['id', 'name', 'email', 'phone', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private router: Router) { }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.store.dispatch(loadCustomer());
    this.store.select(getCustomerList).subscribe(items => {
      this.customerData = items;
      this.dataSource = new MatTableDataSource(this.customerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to remove this object ?')) {
      this.store.dispatch(deleteCustomer({ id: id }))
    }
  }

  public editCustomer(id: string): void {
    this.router.navigateByUrl(`/customer/edit/${id}`);
  }
}

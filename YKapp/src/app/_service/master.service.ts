import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:3000/customers');
  }

  public createCustomer(customer: Customer) {
    return this.http.post('http://localhost:3000/customers', customer);
  }

  public getCustomerById(id: string) {
    return this.http.get(`http://localhost:3000/customers/${id}`);
  }

  public updateCustomer(customer: Customer) {
    return this.http.put(`http://localhost:3000/customers/${customer.id}`, customer);
  }

  public deleteCustomer(id: string) {
    return this.http.delete(`http://localhost:3000/customers/${id}`);
  }

  public haveAccess(): boolean {
    return true;
  }
}

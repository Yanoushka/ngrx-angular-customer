import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../../_model/post.model';
import { Observable } from 'rxjs';
import { Customer } from '../../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {

  }

  public getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:3000/posts');
  }

  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:3000/customers');
  }

  public getCustomer(id: string) {
    return this.http.get<Customer>(`http://localhost:3000/customers/get?id=${id}`,);
  }

  public createCustomer(customer: Customer) {
    console.log('customer create', customer);
    // use example json-server
    let postObj = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer
      })
    }
    console.log('postObj create', postObj);

    return this.http.post('http://localhost:3000/customers', customer);
  }

  public updateCustomer(customer: Customer) {
    return this.http.put(`http://localhost:3000/customers/update?id=${customer.id}`, customer);
  }

  public deleteCustomer(id: string) {
    let postObj = {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id
      })
    }
    return this.http.delete(`http://localhost:3000/customers/${postObj}`);
  }

  public haveAccess(): boolean {
    return true;
  }
}

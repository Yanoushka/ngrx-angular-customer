import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../../_module/material.module';
import { Customer } from '../../../../_model/customer.model';
import { Store } from '@ngrx/store';
import { addCustomer } from '../../../_store/customer/customer.actions';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent {
  constructor(private builder: FormBuilder, private store: Store) { }

  myform = this.builder.group({
    id: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
  });

  public saveCustomer(): void {
    if (this.myform.valid) {
      const _obj: Customer = {
        id: this.myform.value.id as string,
        name: this.myform.value.name as string,
        email: this.myform.value.email as string,
        phone: this.myform.value.phone as string,
      }
      this.store.dispatch(addCustomer({ customer: _obj }))
    }
  }
}

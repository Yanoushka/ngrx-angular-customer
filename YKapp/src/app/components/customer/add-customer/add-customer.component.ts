import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Customer } from '../../../../_model/customer.model';
import { MaterialModule } from '../../../../_module/material.module';
import { addCustomer, getCustomer, updateCustomer } from '../../../_store/customer/customer.actions';
import { getEditData } from '../../../_store/customer/customer.selector';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent implements OnInit {
  private editId!: string;
  public pageTitle = 'Add customer';

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.editId = this.activeRoute.snapshot.paramMap.get('id') as string;
    if (this.editId) {
      this.pageTitle = 'Edit customer';
      this.myform.controls.id.disable();
      this.store.dispatch(getCustomer({ id: this.editId }));
      this.store.select(getEditData).subscribe(item => {
        this.myform.setValue({
          id: item ? item.id : '',
          name: item ? item.name : '',
          email: item ? item.name : '',
          phone: item ? item.phone : '',
        });
      });
    }
  }

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

      if (this.editId) {
        _obj.id = this.editId;
        this.store.dispatch(updateCustomer({ customer: _obj }));
      } else {
        this.store.dispatch(addCustomer({ customer: _obj }));
      }
      this.router.navigateByUrl(`/customer`);
    }
  }
}

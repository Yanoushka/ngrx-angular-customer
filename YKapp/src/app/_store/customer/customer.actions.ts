import { createAction, props } from "@ngrx/store";
import { Customer } from "../../../_model/customer.model";

export const LOAD_CUSTOMER = "[customer] load customer"
export const LOAD_CUSTOMER_SUCCESS = "[customer] load customer success"
export const LOAD_CUSTOMER_FAIL = "[customer] load customer fail"

export const ADD_CUSTOMER = "[customer] add customer"
export const ADD_CUSTOMER_SUCCESS = "[customer] add customer success"
export const ADD_CUSTOMER_FAIL = "[customer] add customer fail"

export const UPDATE_CUSTOMER = "[customer] update customer"
export const UPDATE_CUSTOMER_SUCCESS = "[customer] update customer success"
export const UPDATE_CUSTOMER_FAIL = "[customer] update customer fail"

export const DELETE_CUSTOMER = "[customer] delete customer"
export const DELETE_CUSTOMER_SUCCESS = "[customer] delete customer success"
export const DELETE_CUSTOMER_FAIL = "[customer] delete customer fail"

export const SHOW_ALERT = "[message] [responseType]"

export const loadCustomer = createAction(LOAD_CUSTOMER);
export const loadCustomerSuccess = createAction(LOAD_CUSTOMER_SUCCESS, props<{ list: Customer[] }>());
export const loadCustomerFail = createAction(LOAD_CUSTOMER_FAIL, props<{ errorMessage: String }>());

export const addCustomer = createAction(ADD_CUSTOMER, props<{ customer: Customer }>());
export const addCustomerSuccess = createAction(ADD_CUSTOMER_SUCCESS);
export const addCustomerFail = createAction(ADD_CUSTOMER_FAIL);

export const updateCustomer = createAction(UPDATE_CUSTOMER, props<{ customer: Customer }>());
export const updateCustomerSuccess = createAction(UPDATE_CUSTOMER_SUCCESS);
export const updateCustomerFail = createAction(LOAD_CUSTOMER_FAIL);

export const deleteCustomer = createAction(DELETE_CUSTOMER, props<{ id: string }>());
export const deleteCustomerSuccess = createAction(DELETE_CUSTOMER_SUCCESS, props<{ id: string }>());
export const deleteCustomerFail = createAction(LOAD_CUSTOMER_FAIL);

export const showAlert = createAction(SHOW_ALERT, props<{ message: string, responseType: string }>());
export const emptyAction = createAction('empty action');
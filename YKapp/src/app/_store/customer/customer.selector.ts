import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerModel } from "../../../_model/customer.model";

const getCustomerState = createFeatureSelector<CustomerModel>('customer');

export const getCustomerList = createSelector(getCustomerState, (state) => {
    return state.list;
});
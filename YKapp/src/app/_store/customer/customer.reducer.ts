import { createReducer, on } from "@ngrx/store";
import { customerState } from "./customer.state";
import { deleteCustomerSuccess, loadCustomerFail, loadCustomerSuccess } from "./customer.actions";

const _CustomerReducer = createReducer(customerState,
    on(loadCustomerSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errorMessage: ''
        }
    }),
    on(loadCustomerFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMessage
        }
    }),
    on(deleteCustomerSuccess, (state, action) => {
        let newState = state.list.filter(item => item.id != action.id);
        return {
            ...state,
            list: newState,
            errorMessage: '',
        }
    })
)

export function CustomerReducer(state: any, action: any) {
    return _CustomerReducer(state, action);
}
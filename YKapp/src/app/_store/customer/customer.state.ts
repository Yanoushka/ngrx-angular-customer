import { CustomerModel } from "../../../_model/customer.model";

export const customerState: CustomerModel = {
    list: [],
    errorMessage: '',
    editData: {
        id: '',
        name: '',
        email: '',
        phone: '',
    },
}
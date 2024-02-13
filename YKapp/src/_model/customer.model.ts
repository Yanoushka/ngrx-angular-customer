export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface CustomerModel {
    list: Customer[];
    errorMessage: String;
    editData?: Customer;
}
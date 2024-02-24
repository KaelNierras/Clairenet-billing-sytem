import { ref } from "vue";

export type Customer = {
    customerName: string;
    address: string;
    createdDate: string;
    status: string;
    [key: string]: string;
};

export type SortOrders = {
    [K in keyof Customer]?: number;
};


export const customers = ref<Customer[]>([
    { customerName: 'John Doe', address: '123 Main St', createdDate: '2022-12-31', status: 'Active' },
    { customerName: 'Jane Doe', address: '456 Oak St', createdDate: '2023-01-31', status: 'Not active' },
    { customerName: 'Bob Smith', address: '789 Pine St', createdDate: '2022-11-30', status: 'Active' },
]);
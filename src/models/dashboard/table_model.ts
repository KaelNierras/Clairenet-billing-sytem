import { ref } from "vue";

export type Customer = {
    customerName: string;
    address: string;
    dueDate: string;
    bill: string;
    status: string;
    [key: string]: string;
};

export type SortOrders = {
    [K in keyof Customer]?: number;
};

export const customers = ref<Customer[]>([
    { customerName: 'John Doe', address: '123 Main St', dueDate: '2022-12-31', bill: 'Bill001', status: 'Paid' },
    { customerName: 'Jane Doe', address: '456 Oak St', dueDate: '2023-01-31', bill: 'Bill002', status: 'Unpaid' },
    { customerName: 'Bob Smith', address: '789 Pine St', dueDate: '2022-11-30', bill: 'Bill003', status: 'Paid' },
]);
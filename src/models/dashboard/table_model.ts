import { ref } from "vue";

export type CustomerPayable = {
    customerName: string;
    address: string;
    dueDate: Date;
    bill: string;
    status: string;
    [key: string]: string | Date;
};

export type SortOrders = {
    [K in keyof CustomerPayable]?: number;
};

export const customersPayable = ref<CustomerPayable[]>([]);
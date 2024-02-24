import { ref } from "vue";
import { Customer } from "@/models/customer/customer_model";

export type SortOrders = {
    [K in keyof Customer]?: number;
};

export const customers = ref([] as Customer[]);


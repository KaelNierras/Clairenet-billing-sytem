// upcoming_due_model.ts

export type Customer = {
    customerName: string;
    dueDate: Date;
    [key: string]: string | Date;
};

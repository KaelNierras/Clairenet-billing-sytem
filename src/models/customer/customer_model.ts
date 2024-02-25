export type Customer = {
    customerName: string;
    address: string;
    createdDate: Date;
    status: string;
    [key: string]: string | Date;
};

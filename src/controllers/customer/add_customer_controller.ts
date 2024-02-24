import { addUserData } from "@/data/repositories/firebase_services";
import { Customer } from "@/models/customer/customer_model";
import { ref } from "vue";
import { fetchCustomers } from "./table_dashboard_controller";

export function useAddCustomerController() {
    // Reactive Variables
    const customerName = ref('');
    const selectedMunicipality = ref('');
    const selectedBarangay = ref('');

    const addCustomer = async () => {
        const customer = {
            customerName: customerName.value,
            address: `${selectedBarangay.value}, ${selectedMunicipality.value}`,
            createdDate: new Date().toDateString(),
            status: 'Active',
        } as Customer;
        try {
            await addUserData(customer);
            fetchCustomers();
            window.alert('User data added successfully');
        } catch (error) {
            window.alert(`Error adding user data:', ${error}`);
        }
    };

    return {
        selectedBarangay,
        selectedMunicipality,
        customerName,
        addCustomer,
    };
}
import { addCustomerData } from "@/data/repositories/firebase_services";
import { Customer } from "@/models/customer/customer_model";
import { ref } from "vue";
import { fetchCustomers } from "./table_dashboard_controller";

export function useAddCustomerController() {
    // Reactive Variables
    const customerName = ref('');
    const selectedMunicipality = ref('');
    const selectedBarangay = ref('');

    const addCustomer = async () => {
        if (!customerName.value || !selectedMunicipality.value || !selectedBarangay.value) {
            window.alert('All fields are required.');
            return;
        }
    
        const customer = {
            customerName: customerName.value,
            address: `${selectedBarangay.value}, ${selectedMunicipality.value}`,
            createdDate: new Date(),
            status: 'Active',
        } as Customer;
        try {
            await addCustomerData(customer);
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
import { ref, onMounted } from "vue";
import { addPayable, getCustomersAddress, getCustomerNames } from "@/data/repositories/firebase_services";
import { CustomerPayable } from "@/models/dashboard/table_model";
import { fetchPayable } from "./table_dashboard_controller";
import { fetchUpcomingDuePayables } from '../../controllers/dashboard/upcoming_due_controller';


export function useAddPayableController() {
    // Reactive Variable
    const date = ref<Date>()
    const customerName = ref('')
    const bill = ref('')
    const address = ref('')
    const customerNames = ref<string[]>([''])

    const fetchCustomerName = async () => {
        try {
            const customerData = await getCustomerNames();
            customerNames.value = customerData;
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }

    const fetchAddress = async () => {
        const addr = await getCustomersAddress(customerName.value);
        address.value = addr.toString();
    }

    const addPayableData = async () => {
        if (!customerName.value || !bill.value || !date.value) {
            window.alert('All fields are required.');
            return;
        }
    
        await fetchAddress();
        const CustomerPayable = {
            customerName: customerName.value,
            address: address.value,
            dueDate: date.value,
            bill: bill.value,
            status: 'Unpaid',
        } as CustomerPayable;
        try {
            await addPayable(CustomerPayable);
            await fetchPayable();
            await fetchUpcomingDuePayables();
            window.alert('Customer payable data added successfully');
        } catch (error) {
            window.alert(`Error adding user data:', ${error}`);
        }
    };

    onMounted(fetchCustomerName)
    return {
        date,
        customerName,
        customerNames,
        bill,
        addPayableData
    };
}
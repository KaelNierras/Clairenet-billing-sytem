import { updateCustomerStatus } from "@/data/repositories/firebase_services";
import { fetchCustomers } from "./table_dashboard_controller";


export function useUpdateStatusController() {
    const updateStatus = async (customerName: string, status: string) => {
        try {
            await updateCustomerStatus(customerName, status);
            fetchCustomers();
            window.alert('User status updated successfully');
        } catch (error) {
            window.alert(`Error updating user status:', ${error}`);
        }
    };

    return {
        updateStatus,
    };
}
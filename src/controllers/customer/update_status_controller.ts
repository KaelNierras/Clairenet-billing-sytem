import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
import { updateCustomerStatus, deleteCustomer } from "@/data/repositories/firebase_services";
import { fetchCustomers } from "./table_dashboard_controller";


export function useUpdateStatusController() {
    const updateStatus = async (customerName: string, status: string) => {
        try {
            await updateCustomerStatus(customerName, status);
            fetchCustomers();
            toast({
                title: 'User status updated successfully',
            });
        } catch (error) {
            window.alert(`Error updating user status:', ${error}`);
        }
    };

    const deleteSelectedCustomer = async (customerName: string) => {
        try {
            await deleteCustomer(customerName);
            fetchCustomers();
            window.alert('Customer successfully deleted');
        } catch (error) {
            window.alert(`Error in deleting customer:', ${error}`);
        }
    };

    return {
        deleteSelectedCustomer,
        updateStatus,
    };
}
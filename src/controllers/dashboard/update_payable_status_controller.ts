import { updatePayableStatus } from "@/data/repositories/firebase_services";
import { fetchPayable } from "../dashboard/table_dashboard_controller";

export const updateStatus = async (customerName: string, status: string) => {
    try {
        await updatePayableStatus(customerName, status);
        fetchPayable();
    } catch (error) {
        window.alert(`Error updating user status:', ${error}`);
    }
};
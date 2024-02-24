import { addUserData } from "@/data/repositories/firebase_services";
import { Customer } from "@/models/customer/customer_model";
import { ref } from "vue";

export function useAddPayableController() {
    //Reactive Variable
const customerName = ref('')
const selectedMunicipality = ref('');
const selectedBarangay = ref('');

const customer = ref({
    customerName: customerName.value,
    address: `${selectedBarangay.value}, ${selectedMunicipality.value}`,
    createdDate: new Date(),
    status: 'Active',
} as Customer);

const addPayable = async ()  => {
    try {
        await addUserData(customer.value);
        console.log('User data added successfully');
    } catch (error) {
        console.error('Error adding user data:', error);
    }
};

    return{
        selectedBarangay,
        selectedMunicipality,
        customerName,
        addPayable
    };

}



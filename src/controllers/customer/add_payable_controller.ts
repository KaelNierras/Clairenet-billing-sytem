import { ref } from "vue";

export function useAddPayableController() {
    //Reactive Variable
const customerName = ref('')
const selectedMunicipality = ref('');
const selectedBarangay = ref('');

const addPayable = () => {
    console.log('Name:',customerName.value,'\nAddress:',selectedBarangay.value,',',selectedMunicipality.value);
};

    return{
        selectedBarangay,
        selectedMunicipality,
        customerName,
        addPayable
    };

}



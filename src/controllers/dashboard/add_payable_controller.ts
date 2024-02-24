import { ref } from "vue";

export function useAddPayableController() {
    //Reactive Variable
const date = ref<Date>()
const customerName = ref('')
const bill = ref('')
const addPayable = () => {
    console.log(customerName.value, date.value, bill.value);
};

    return{
        date,
        customerName,
        bill,
        addPayable
    };

}



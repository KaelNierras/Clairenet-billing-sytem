import { ref, reactive, computed } from 'vue';
import { Customer, SortOrders, customers } from '@/models/customer/table_model';


export function useTableDashboardController() {
    const search = ref('');
    let filterChoice = ref('customerName');
    const sortKey = ref<keyof Customer | ''>('');
    const sortOrders = reactive<SortOrders>({
        customerName: 1,
        address: 1,
        dueDate: 1,
        status: 1
    });
    
    const updateSearch = (choice: string) => {
        search.value = choice;
    };

    const handleClick = (choice: string) => {
        search.value = '';
        filterChoice.value = choice as string;
    };

    const textConverter = (text: string) => {
        switch (text) {
            case 'customerName':
                return 'Customer Name';
            case 'address':
                return 'Address';
            case 'createdDate':
                return 'Created Date';
            case 'status':
                return 'Status';
            default:
                return text;
        }
    };

    const sort = (key: keyof Customer) => {
        sortKey.value = key;
        sortOrders[key] = sortOrders[key]! * -1;
        customers.value.sort((a, b) => {
            const aKey = a[key];
            const bKey = b[key];
            return (aKey === bKey ? 0 : aKey > bKey ? 1 : -1) * sortOrders[key]!;
        });
    };

    const filteredCustomer = computed(() => {
        if (search.value && filterChoice.value !== 'status') {
            return customers.value.filter(customers =>
                customers[filterChoice.value].toLowerCase().includes(search.value.toLowerCase())
            );
        } else if (filterChoice.value == 'status' && search.value.toLowerCase() === 'active') {
            return customers.value.filter(customers => customers.status === 'Active');
        } else if (filterChoice.value == 'status' && search.value.toLowerCase() === 'not active') {
            return customers.value.filter(customers => customers.status === 'Not active');
        }
        else {
            return customers.value;
        }
    });

    return {
        search,
        filterChoice,
        sortKey,
        sortOrders,
        customers,
        updateSearch,
        handleClick,
        textConverter,
        sort,
        filteredCustomer
    };
}
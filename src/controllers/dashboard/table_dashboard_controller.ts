import { ref, reactive, computed } from 'vue';
import { CustomerPayable, SortOrders } from '@/models/dashboard/table_model';
import { getPayable } from '@/data/repositories/firebase_services';

export const customersPayable = ref<CustomerPayable[]>([]);

export const fetchPayable = async () => {
    try {
        const payableData = await getPayable();
        const sortedPayableData = payableData.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        customersPayable.value = sortedPayableData as CustomerPayable[];
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
};

export function useTableDashboardController() {
    const search = ref('');
    let filterChoice = ref('customerName');
    const sortKey = ref<keyof CustomerPayable | ''>('');
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
            case 'dueDate':
                return 'Due Date';
            case 'status':
                return 'Status';
            default:
                return text;
        }
    };

    const sort = (key: keyof CustomerPayable) => {
        sortKey.value = key;
        sortOrders[key] = sortOrders[key]! * -1;
        customersPayable.value.sort((a, b) => {
            const aKey = a[key];
            const bKey = b[key];
            return (aKey === bKey ? 0 : aKey > bKey ? 1 : -1) * sortOrders[key]!;
        });
    };

    const filteredCustomer = computed(() => {
        if (search.value && filterChoice.value !== 'status') {
            return customersPayable.value.filter(customersPayable =>
                String(customersPayable[filterChoice.value]).toLowerCase().includes(search.value.toLowerCase())
            );
        } else if (filterChoice.value == 'status' && search.value.toLowerCase() === 'paid') {
            return customersPayable.value.filter(customersPayable => customersPayable.status === 'Paid');
        } else if (filterChoice.value == 'status' && search.value.toLowerCase() === 'unpaid') {
            return customersPayable.value.filter(customersPayable => customersPayable.status === 'Unpaid');
        }
        else {
            return customersPayable.value;
        }
    });

    return {
        search,
        filterChoice,
        sortKey,
        sortOrders,
        customersPayable,
        updateSearch,
        handleClick,
        textConverter,
        sort,
        filteredCustomer
    };
}
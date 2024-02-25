// upcoming_due_controller.ts
import { Customer } from '../../models/dashboard/upcoming_due_model';
import {getUpcomingDuePayables} from '@/data/repositories/firebase_services';
import { computed, ref } from 'vue';

export const upComingDueList = ref<Customer[]>([]);

export const seeAll = () => {
    limit.value = upComingDueList.value.length; // Show all items
};

export const seeLess = () => {
    limit.value = 3; // Decrease limit by 3, but not less than 3
};

export const limit = ref(3);

export const limitedUpComingDueList = computed(() => upComingDueList.value.slice(0, limit.value));

export const fetchUpcomingDuePayables = async () => {
    try {
        let customerData = await getUpcomingDuePayables();
        customerData = customerData.map(customer => {
            const dueDate = customer.dueDate.toDate(); // Convert Firestore Timestamp to JavaScript Date
            customer.dueDate = dueDate.toDateString(); // Convert Date to string
            return customer;
        });

        // Sort customerData in ascending order based on dueDate
        customerData.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        upComingDueList.value = customerData as Customer[];
    } catch (error) {
        console.error('Error fetching upcoming due payables:', error);
    }
};

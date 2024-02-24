// upcoming_due_model.ts
import { ref, computed } from 'vue';

export const upComingDueList = ref([
    { custorName: 'John Doe', dueDate: '2022-12-31' },
    { custorName: 'Jane Doe', dueDate: '2022-12-30' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
    { custorName: 'Jim Doe', dueDate: '2022-12-29' },
]);

export const limit = ref(3);

export const limitedUpComingDueList = computed(() => upComingDueList.value.slice(0, limit.value));
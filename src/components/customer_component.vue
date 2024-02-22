<template>
    <div class="car rounded bg-gray-50 dark:bg-gray-700">
        <div class="p-4 flex flex-row justify-between items-center">
            <div class="flex gap-2 items-center p-2 rounded w-1/2 sm:1/3"
                style="background-color: rgba(255, 255, 255, 0.299);">
                <span class="material-symbols-outlined">
                    search
                </span>
                <input v-model="search" type="text" placeholder="Search customer"
                    class="w-full px-3 py-2 text-sm leading-tight dark:text-white text-gray-700 bg-transparent rounded appearance-none focus:outline-none focus:shadow-outline" />
            </div>
            <Button>Add customers</Button>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                Customer name
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                    @click="sort('customerName')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            <div class="flex flex-row items-center gap-3">
                                Email
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                    @click="sort('email')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                Phone
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                    @click="sort('phone')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            <div class="flex flex-row items-center gap-3">
                                Registered Date
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                    @click="sort('registeredDate')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                <div class="flex flex-row items-center gap-3">
                                    Last Order Date
                                    <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                        @click="sort('lastOrderDate')">
                                        swap_vert
                                    </span>
                                </div>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, index) in filteredCustomers" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ customer.customerName }}
                        </th>
                        <td class="px-6 py-4">
                            {{ customer.email }}
                        </td>
                        <td class="px-6 py-4">
                            {{ customer.phone }}
                        </td>
                        <td class="px-6 py-4">
                            {{ customer.registeredDate }}
                        </td>
                        <td class="px-6 py-4">
                            {{ customer.lastOrderDate }}
                        </td>
                        <td class="px-6 py-4 text-left">
                            <div class="flex gap-4">
                                <AlertDialog>
                                <AlertDialogTrigger as-child>
                                    <Button variant="destructive">
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger as-child>
                                    <Button variant="success">
                                        Edit
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ref, reactive, onMounted, computed } from 'vue';
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite()
});

type Customer = {
    customerName: string;
    email: string;
    phone: string;
    registeredDate: string;
    lastOrderDate: string;
};

type SortOrders = {
    [K in keyof Customer]?: number;
};

const customers = ref<Customer[]>([
    { customerName: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', registeredDate: '2022-01-01', lastOrderDate: '2022-12-31' },
    { customerName: 'Jane Doe', email: 'jane.doe@example.com', phone: '234-567-8901', registeredDate: '2022-02-01', lastOrderDate: '2022-12-30' },
    { customerName: 'Bob Smith', email: 'bob.smith@example.com', phone: '345-678-9012', registeredDate: '2022-03-01', lastOrderDate: '2022-12-29' },
]);

const sortKey = ref<keyof Customer | ''>('');
const sortOrders = reactive<SortOrders>({
    customerName: 1,
    email: 1,
    phone: 1,
    registeredDate: 1,
    lastOrderDate: 1
});

const sort = (key: keyof Customer) => {
    sortKey.value = key;
    sortOrders[key] = sortOrders[key]! * -1;
    customers.value.sort((a, b) => {
        const aKey = a[key];
        const bKey = b[key];
        return (aKey === bKey ? 0 : aKey > bKey ? 1 : -1) * sortOrders[key]!;
    });
};

const search = ref('');

const filteredCustomers = computed(() => {
    if (search.value) {
        return customers.value.filter(customer => customer.customerName.toLowerCase().includes(search.value.toLowerCase()));
    } else {
        return customers.value;
    }
});
</script>
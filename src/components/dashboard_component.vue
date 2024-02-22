<template>
    <div class="car rounded bg-gray-50 dark:bg-gray-700">
        <div class="p-4 flex flex-row justify-between items-center">
            <div class="flex gap-2 items-center p-2 rounded w-1/2 sm:1/3" style="background-color: rgba(255, 255, 255, 0.299);">
                <span class="material-symbols-outlined">
                    search
                </span>
                <input v-model="search" type="text" placeholder="Search customer"
                    class="w-full px-3 py-2 text-sm leading-tight dark:text-white text-gray-700 bg-transparent rounded appearance-none focus:outline-none focus:shadow-outline" />
            </div>
            <Button>Add payable</Button>
            
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
                                Address
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                    @click="sort('address')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                Due Date
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                    @click="sort('dueDate')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            <div class="flex flex-row items-center gap-3">
                                Bill
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                    @click="sort('bill')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                <div class="flex flex-row items-center gap-3">
                                    Status
                                    <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-blue-500"
                                        @click="sort('status')">
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
                    <tr v-for="(product, index) in filteredProducts" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ product.customerName }}
                        </th>
                        <td class="px-6 py-4">
                            {{ product.address }}
                        </td>
                        <td class="px-6 py-4">
                            {{ product.dueDate }}
                        </td>
                        <td class="px-6 py-4">
                            {{ product.bill }}
                        </td>
                        <td class="px-6 py-4">
                            {{ product.status }}
                        </td>
                        <td class="px-6 py-4 text-left">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { initFlowbite } from 'flowbite'
import { Button } from '@/components/ui/button'

onMounted(() => {
    initFlowbite()
});

type Product = {
    customerName: string;
    address: string;
    dueDate: string;
    bill: string;
    status: string;
};

type SortOrders = {
    [K in keyof Product]?: number;
};

const products = ref<Product[]>([
    { customerName: 'John Doe', address: '123 Main St', dueDate: '2022-12-31', bill: 'Bill001', status: 'Paid' },
    { customerName: 'Jane Doe', address: '456 Oak St', dueDate: '2023-01-31', bill: 'Bill002', status: 'Unpaid' },
    { customerName: 'Bob Smith', address: '789 Pine St', dueDate: '2022-11-30', bill: 'Bill003', status: 'Paid' },
]);

const sortKey = ref<keyof Product | ''>('');
const sortOrders = reactive<SortOrders>({
    customerName: 1,
    address: 1,
    dueDate: 1,
    status: 1
});

const sort = (key: keyof Product) => {
    sortKey.value = key;
    sortOrders[key] = sortOrders[key]! * -1;
    products.value.sort((a, b) => {
        const aKey = a[key];
        const bKey = b[key];
        return (aKey === bKey ? 0 : aKey > bKey ? 1 : -1) * sortOrders[key]!;
    });
};

const search = ref('');

const filteredProducts = computed(() => {
    if (search.value) {
        return products.value.filter(product => product.customerName.toLowerCase().includes(search.value.toLowerCase()));
    } else {
        return products.value;
    }
});
</script>
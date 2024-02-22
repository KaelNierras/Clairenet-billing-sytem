<template>
    <h5 class="mb-5 font-bold">Upcoming Due</h5>
    <div class="flex flex-row gap-5">
        <Alert v-for="(item, index) in upComingDueList" :key="index" class="mb-5 w-64">
            <ReceiptText class="h-4 w-4" />
            <AlertTitle>{{ item.name }}</AlertTitle>
            <AlertDescription>
                {{ item.date }}
            </AlertDescription>
        </Alert>
    </div>
    <div class="card rounded bg-gray-50 dark:bg-gray-700 mt-2">
        <div class="p-4 flex flex-row justify-between items-center">
            <div class="flex gap-2 items-center p-2 rounded w-1/2 sm:1/3"
                style="background-color: rgba(255, 255, 255, 0.299);">
                <span class="material-symbols-outlined">
                    search
                </span>
                <input v-model="search" type="text" :placeholder="'Search ' + textConverter(filterChoice)"
                    class="w-full px-3 py-2 text-sm leading-tight dark:text-white text-gray-700 bg-transparent rounded appearance-none focus:outline-none focus:shadow-outline" />
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline">
                            <span class="material-symbols-outlined">
                                filter_alt
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">
                        <DropdownMenuLabel>Filter categories</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem @click="handleClick('customerName')">
                                <span class="material-symbols-outlined mr-2">
                                    person
                                </span>
                                <span>Customer Name</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="handleClick('address')">
                                <span class="material-symbols-outlined mr-2">
                                    pin_drop
                                </span>
                                <span>Address</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="handleClick('dueDate')">
                                <span class="material-symbols-outlined mr-2">
                                    payments
                                </span>
                                <span>Due Date</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="handleClick('status')">
                                <span class="material-symbols-outlined mr-2">
                                    checklist_rtl
                                </span>
                                <span>Status</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button variant="outline">
                        Add payable
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add payable</DialogTitle>
                        <DialogDescription>
                            Add a payable to the Customer. 
                        </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="username" class="text-right">
                                Address
                            </Label>
                            <Input id="username" value="@peduarte" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="username" class="text-right">
                                Due Date
                            </Label>
                            <Input id="username" value="@peduarte" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="username" class="text-right">
                                Bill
                            </Label>
                            <Input id="username" value="@peduarte" class="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
                            <div class="flex gap-4">
                                <Dialog>
                                    <DialogTrigger as-child>
                                        <Button variant="outline">
                                            Edit Profile
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent class="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div class="grid gap-4 py-4">
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="name" class="text-right">
                                                    Name
                                                </Label>
                                                <Input id="name" value="Pedro Duarte" class="col-span-3" />
                                            </div>
                                            <div class="grid grid-cols-4 items-center gap-4">
                                                <Label for="username" class="text-right">
                                                    Username
                                                </Label>
                                                <Input id="username" value="@peduarte" class="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
//Shadcn Imports
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ReceiptText } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ref, reactive, onMounted, computed } from 'vue';
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite()
});

type Product = {
    customerName: string;
    address: string;
    dueDate: string;
    bill: string;
    status: string;
    [key: string]: string; // Add index signature
};

const handleClick = (choice: string) => {
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

const search = ref('');
let filterChoice = ref('customerName'); // default filter choice

type SortOrders = {
    [K in keyof Product]?: number;
};

const products = ref<Product[]>([
    { customerName: 'John Doe', address: '123 Main St', dueDate: '2022-12-31', bill: 'Bill001', status: 'Paid' },
    { customerName: 'Jane Doe', address: '456 Oak St', dueDate: '2023-01-31', bill: 'Bill002', status: 'Unpaid' },
    { customerName: 'Bob Smith', address: '789 Pine St', dueDate: '2022-11-30', bill: 'Bill003', status: 'Paid' },
]);

const upComingDueList = ref([
    { name: 'John Doe', date: '2022-12-31' },
    { name: 'Jane Doe', date: '2022-12-30' },
    { name: 'Jim Doe', date: '2022-12-29' },
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

const filteredProducts = computed(() => {
    if (search.value) {
        return products.value.filter(product =>
            product[filterChoice.value].toLowerCase().includes(search.value.toLowerCase())
        );
    } else {
        return products.value;
    }
});
</script>
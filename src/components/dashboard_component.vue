<template>
    <h5 class="mb-5 text-xl font-bold">Upcoming Due</h5>
    <div class="flex flex-col gap-3 overflow-y-auto md:flex-row mb-5">
        <Alert v-for="(dueList, index) in limitedUpComingDueList" :key="index" class="w-auto md:min-w-56">
            <ReceiptText class="h-4 w-4" />
            <AlertTitle>{{ dueList.custorName }}</AlertTitle>
            <AlertDescription>
                {{ dueList.dueDate }}
            </AlertDescription>
        </Alert>
        <button v-if="upComingDueList.length > limit" @click="seeAll" class="btn btn-primary justify-center item-center flex md:flex-col flex-row"><ChevronRightSquare /></button>
        <button v-if="limit > 3" @click="seeLess" class="btn btn-primary justify-center item-center flex md:flex-col flex-row"><ChevronLeftSquare /></button>
    </div>
    <div class="card rounded border text-foreground mt-2">
        <div class="p-4 flex flex-row justify-between items-center">    
            <div class="flex gap-2 items-center p-2 rounded w-1/2 sm:1/3"
                >
                <span class="material-symbols-outlined">
                    search
                </span>
                <input v-model="search" type="text" :placeholder="'Search ' + textConverter(filterChoice)"
                    class="w-full px-3 py-2 text-sm leading-tight bg-transparent rounded appearance-none focus:outline-none focus:shadow-outline"
                    :disabled="filterChoice === 'status'" />
                <DropdownMenu v-if="filterChoice == 'status'">
                    <DropdownMenuTrigger as-child>
                        <Button variant="secondary">
                            Status
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">
                        <DropdownMenuLabel>Filter status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem @click="updateSearch('Paid')">
                                <span class="material-symbols-outlined mr-2">
                                    check_circle
                                </span>
                                <span>Paid</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="updateSearch('Unpaid')">
                                <span class="material-symbols-outlined mr-2">
                                    close
                                </span>
                                <span>Unpaid</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="default">
                            <span class="material-symbols-outlined">
                                filter_alt
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
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
                    <Button variant="default">
                        Add payable
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add payable</DialogTitle>
                        <DialogDescription>
                            Add a payable to a Customer.
                        </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label class="text-right">
                                Name
                            </Label>
                            <Input v-model="customerName" type="text" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label class="text-right">
                                Address
                            </Label>
                            <!-- <div class="grid grid-cols-1">
                                <Input v-model="address" type="text" class="col-span-1" />
                            </div>
                            <div class="grid grid-cols-1">
                                <Input v-model="address" type="text" class="col-span-1" />
                            </div>
                            <div class="grid grid-cols-1">
                                <Input v-model="address" type="text" class="col-span-1" />
                            </div> -->
                            <Input v-model="address" type="text" class="col-span-3" />

                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label class="text-right">
                                Due Date
                            </Label>
                            <Popover>
                                <PopoverTrigger as-child>
                                    <Button :variant="'outline'" :class="cn(
                                        'w-[280px] justify-start text-left font-normal',
                                        !date && 'text-muted-foreground',
                                    )">
                                        <CalendarIcon class="mr-2 h-4 w-4" />
                                        <span>{{ date ? format(date, "PPP") : "Pick a date" }}</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0">
                                    <Calendar v-model="date" />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label class="text-right">
                                Bill
                            </Label>
                            <Input v-model="bill" min="0" type="number" class="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variance="secondary" type="submit" @click="addPayable()">
                            Add
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right">
                <thead class=" text- uppercase">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                Customer name
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-accent"
                                    @click="sort('customerName')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            <div class="flex flex-row items-center gap-3">
                                Address
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-accent"
                                    @click="sort('address')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                Due Date
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-accent"
                                    @click="sort('dueDate')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3 ">
                            <div class="flex flex-row items-center gap-3">
                                Bill
                                <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-accent"
                                    @click="sort('bill')">
                                    swap_vert
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center gap-3">
                                <div class="flex flex-row items-center gap-3">
                                    Status
                                    <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-accent"
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
                    <tr v-for="(customer, index) in filteredCustomer" :key="index"
                        class="border-b ">
                        <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap">
                            {{ customer.customerName }}
                        </th>
                        <td class="px-6 py-4">
                            {{ customer.address }}
                        </td>
                        <td class="px-6 py-4">
                            {{ customer.dueDate }}
                        </td>
                        <td class="px-6 py-4">
                            {{ customer.bill }}
                        </td>
                        <td class="px-6 py-4">
                            {{ customer.status }}
                        </td>
                        <td class="px-6 py-4 text-left">
                            <div class="flex gap-4">
                                <Dialog>
                                    <DialogTrigger as-child>
                                        <Button variant="default">
                                            <SquarePen />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent class="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Update Status</DialogTitle>
                                            <DialogDescription>
                                                Update status whether the customer has already paid.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="default" @click="updateStatus(customer.customerName, 'Paid')"
                                                type="submit">
                                                Make as Paid
                                            </Button>
                                            <Button variant="destructive"
                                                @click="updateStatus(customer.customerName, 'Unpaid')" type="submit">
                                                Make as Unpaid
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
import { format } from 'date-fns'
import { Calendar as CalendarIcon, SquarePen } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

//Lucide Icons
import { ReceiptText, ChevronRightSquare, ChevronLeftSquare } from 'lucide-vue-next'

//Vue Imports
import { ref, reactive, onMounted, computed } from 'vue';


//Flowbite Imports
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite()
});

//Reactive Variables
const date = ref<Date>()
const customerName = ref('')
const address = ref('')
const bill = ref('')
const search = ref('');
let filterChoice = ref('customerName');
const sortKey = ref<keyof Customer | ''>('');
const sortOrders = reactive<SortOrders>({
    customerName: 1,
    address: 1,
    dueDate: 1,
    status: 1
});
const limit = ref(3);

//Customer that represents an object with specific properties
type Customer = {
    customerName: string;
    address: string;
    dueDate: string;
    bill: string;
    status: string;
    [key: string]: string;
};

//Methods
const updateSearch = (choice: string) => {
    search.value = choice;
};

const handleClick = (choice: string) => {
    search.value = '';
    filterChoice.value = choice as string;
};

const updateStatus = (name: string, status: string) => {
    console.log(name, 'is ', status);
};

const addPayable = () => {
    console.log(customerName.value, address.value, date.value, bill.value);
};

const limitedUpComingDueList = computed(() => upComingDueList.value.slice(0, limit.value));

const seeAll = () => {
    limit.value = upComingDueList.value.length; // Show all items
};


const seeLess = () => {
    limit.value = 3; // Decrease limit by 3, but not less than 3
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

type SortOrders = {
    [K in keyof Customer]?: number;
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
    } else if (filterChoice.value == 'status' && search.value.toLowerCase() === 'paid') {
        return customers.value.filter(customers => customers.status === 'Paid');
    } else if (filterChoice.value == 'status' && search.value.toLowerCase() === 'unpaid') {
        return customers.value.filter(customers => customers.status === 'Unpaid');
    }
    else {
        return customers.value;
    }
});


//Firebase Data
const customers = ref<Customer[]>([
    { customerName: 'John Doe', address: '123 Main St', dueDate: '2022-12-31', bill: 'Bill001', status: 'Paid' },
    { customerName: 'Jane Doe', address: '456 Oak St', dueDate: '2023-01-31', bill: 'Bill002', status: 'Unpaid' },
    { customerName: 'Bob Smith', address: '789 Pine St', dueDate: '2022-11-30', bill: 'Bill003', status: 'Paid' },
]);

const upComingDueList = ref([
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

</script>


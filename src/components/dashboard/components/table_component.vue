<template>
    <div class="p-4 flex flex-row justify-between items-center bg-accent">
        <div class="flex gap-2 items-center p-2 rounded bg-background/30 w-1/2 sm:1/3">
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
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
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
                            filter_list
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
        <addPayableComponent />
    </div>
    <div class="relative overflow-x-auto shadow-md">
        <table class="w-full text-sm text-left rtl:text-right">
            <thead class=" text-uppercase bg-accent">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex flex-row items-center gap-3 ">
                            Customer name
                            <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-muted-foreground"
                                @click="sort('customerName')">
                                swap_vert
                            </span>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3 ">
                        <div class="flex flex-row items-center gap-3">
                            Address
                            <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-muted-foreground"
                                @click="sort('address')">
                                swap_vert
                            </span>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex flex-row items-center gap-3">
                            Due Date
                            <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-muted-foreground"
                                @click="sort('dueDate')">
                                swap_vert
                            </span>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3 ">
                        <div class="flex flex-row items-center gap-3">
                            Bill
                            <!-- <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-muted-foreground"
                                @click="sort('bill')">
                                swap_vert
                            </span> -->
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex flex-row items-center gap-3">
                            <div class="flex flex-row items-center gap-3">
                                Status
                                <span
                                    class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-muted-foreground"
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
                <tr v-for="(customer, index) in filteredCustomer" :key="index" class="border-b bg-accent/40">
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
                        <updateStatusComponent :customerName="customer.customerName" :status="customer.status"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import addPayableComponent from './add_payable_component.vue';
import updateStatusComponent from './update_status_component.vue';
import { useTableDashboardController, fetchPayable } from '../../../controllers/dashboard/table_dashboard_controller';

onMounted(async() => {
    initFlowbite()
    await fetchPayable()
});

const {
    search,
    filterChoice,
    updateSearch,
    handleClick,
    textConverter,
    sort,
    filteredCustomer
} = useTableDashboardController();
</script>
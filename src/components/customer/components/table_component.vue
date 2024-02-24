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
                        <DropdownMenuItem @click="updateSearch('Active')">
                            <span class="material-symbols-outlined mr-2">
                                check_circle
                            </span>
                            <span>Active</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="updateSearch('Not active')">
                            <span class="material-symbols-outlined mr-2">
                                close
                            </span>
                            <span>Not active</span>
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
                        <DropdownMenuItem @click="handleClick('createdDate')">
                            <span class="material-symbols-outlined mr-2">
                                person_edit
                            </span>
                            <span>Created Date</span>
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
        <addCustomerComponent />
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
                            Created Date
                            <span class="material-symbols-outlined hover:cursor-pointer text-xl hover:text-muted-foreground"
                                @click="sort('createdDate')">
                                swap_vert
                            </span>
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
                        {{ customer.createdDate }}
                    </td>
                    <td class="px-6 py-4">
                        {{ customer.status }}
                    </td>
                    <td class="px-6 py-4 text-left">
                        <div class="flex gap-4">
                            <updateStatusComponent :customerName="customer.customerName" />
                        </div>
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
import addCustomerComponent from './add_customer_component.vue';
import updateStatusComponent from './update_status_component.vue';
import { useTableDashboardController } from '../../../controllers/customer/table_dashboard_controller';

onMounted(() => {
    initFlowbite()
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
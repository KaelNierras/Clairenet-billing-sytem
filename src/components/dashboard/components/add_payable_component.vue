<template>
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
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon} from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Label } from '@/components/ui/label'
import {useAddPayableController} from '../../../controllers/dashboard/add_payable_controller'

const { date,
        customerName,
        bill,
        addPayable } = useAddPayableController()

</script>

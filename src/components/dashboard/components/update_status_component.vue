<template>
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
                <div class="flex gap-4 flex-col md:flex-row">
                    <DialogClose as-child v-if="props.status == 'Unpaid'">
                        <Button variant="default" @click="updateStatus(props.customerName,'Paid')" type="submit">
                            Mark as paid
                        </Button>
                    </DialogClose>
                    <DialogClose as-child v-if="props.status == 'Paid'" > 
                        <Button variant="destructive" @click="updateStatus(props.customerName,'Unpaid')" type="submit">
                            Mark as unpaid
                        </Button>
                    </DialogClose>
                </div>

            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>


<script setup lang="ts">
//Shadcnc Components
import { Button } from '@/components/ui/button'
import { SquarePen } from 'lucide-vue-next'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog'
import { updateStatus } from '@/controllers/dashboard/update_payable_status_controller'

//Props
const props = defineProps({
    customerName: {
        type: String,
        default: '' // Provide a default value
    },
    status: {
        type: String,
        default: '' // Provide a default value
    }
})

</script>
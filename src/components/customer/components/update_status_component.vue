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
                    Update status whether the customer is still active.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose as-child>
                    <div class="flex gap-4 flex-col md:flex-row">
                        <Button v-if="props.status == 'Not active'" variant="default" @click="updateStatus(props.customerName, 'Active')" type="submit">
                            Mark as active
                        </Button>
                        <Button v-if="props.status == 'Active'" variant="destructive" @click="updateStatus(props.customerName, 'Not active')" type="submit">
                            Mark as not active
                        </Button>
                    </div>
                </DialogClose>


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

import { useUpdateStatusController } from '@/controllers/customer/update_status_controller'

const { updateStatus } = useUpdateStatusController();

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
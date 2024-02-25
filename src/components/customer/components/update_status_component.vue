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
                <AlertDialog>
                    <AlertDialogTrigger as-child>
                        <Button variant="destructive">
                            <Trash2 />
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
                            <AlertDialogAction @click="deleteSelectedCustomer(props.customerName)">Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <DialogClose as-child>
                    <div class="flex gap-4 flex-col  md:flex-row">
                        <Button v-if="props.status == 'Not active'" variant="default"
                            @click="updateStatus(props.customerName, 'Active')" type="submit">
                            Mark as active
                        </Button>
                        <Button v-if="props.status == 'Active'" variant="default"
                            @click="updateStatus(props.customerName, 'Not active')" type="submit">
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
import { SquarePen, Trash2 } from 'lucide-vue-next'
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

const { updateStatus, deleteSelectedCustomer } = useUpdateStatusController();

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
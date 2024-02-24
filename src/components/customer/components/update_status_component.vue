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
                <div class="flex gap-4 flex-col md:flex-row">
                    <Button variant="default" @click="updateStatus('Active')" type="submit">
                        Mark as active
                    </Button>
                    <Button variant="destructive" @click="updateStatus('Not active')" type="submit">
                        Mark as not active
                    </Button>
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
} from '@/components/ui/dialog'

//Props
const props = defineProps({
    customerName: {
        type: String,
        default: '' // Provide a default value
    }
})
const updateStatus = (status: string) => {
    if (props.customerName) { // Check if customerName is defined
        console.log(props.customerName, 'is', status);
    }
};

</script>
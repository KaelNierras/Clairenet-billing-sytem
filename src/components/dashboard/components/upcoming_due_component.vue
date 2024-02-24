<template>
    <h5 class="mb-5 text-xl font-bold">Upcoming Due</h5>
    <div class="flex flex-col gap-3 overflow-y-auto md:flex-row mb-5">
        <Alert v-for="(dueList, index) in limitedUpComingDueList" :key="index" class="w-auto md:min-w-56 bg-accent/40">
            <ReceiptText class="h-4 w-4" />
            <AlertTitle>{{ dueList.custorName }}</AlertTitle>
            <AlertDescription>
                {{ dueList.dueDate }}
            </AlertDescription>
        </Alert>
        <button v-if="upComingDueList.length > limit" @click="seeAll" class="btn btn-primary justify-center item-center flex md:flex-col flex-row"><ChevronRightSquare /></button>
        <button v-if="limit > 3" @click="seeLess" class="btn btn-primary justify-center item-center flex md:flex-col flex-row"><ChevronLeftSquare /></button>
    </div>
</template>


<script setup lang="ts">
//Shadnc Components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

//Lucide Icons
import { ReceiptText, ChevronRightSquare, ChevronLeftSquare } from 'lucide-vue-next'

//Models
import { limitedUpComingDueList, upComingDueList, limit } from '../../../models/dashboard/upcoming_due_model';

//Controllers
import { seeAll, seeLess } from '../../../controllers/dashboard/upcoming_due_controller';

</script>
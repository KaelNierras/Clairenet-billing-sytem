<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="default">
                Add customer
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add customer</DialogTitle>
                <DialogDescription>
                    Add a newCustomer.
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
                        Municipality
                    </Label>
                    <Select>
                        <SelectTrigger class="col-span-3">
                            <SelectValue placeholder="Select a Municipality" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Municipality</SelectLabel>
                                <SelectItem v-model="selectedMunicipality" :value=municipality
                                    v-for="municipality in municipalities" @click="selectedMunicipality = municipality">
                                    {{ municipality }}
                                </SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label class="text-right" v-if="selectedMunicipality == 'Naval, Biliran' || selectedMunicipality == 'Calubian, Leyte'">
                        Barangay
                    </Label>
                    <Select v-if="selectedMunicipality == 'Naval, Biliran'">
                        <SelectTrigger class="col-span-3">
                            <SelectValue placeholder="Select a Barangay" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Barangay</SelectLabel>
                                <SelectItem v-model="selectedBarangay" :value=Barangay v-for="Barangay in navalBarangay"
                                    @click="selectedBarangay = Barangay">
                                    {{ Barangay }}
                                </SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select v-if="selectedMunicipality == 'Calubian, Leyte'">
                        <SelectTrigger class="col-span-3">
                            <SelectValue placeholder="Select a Barangay" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Barangay</SelectLabel>
                                <SelectItem v-model="selectedBarangay" :value=Barangay v-for="Barangay in calubianBarangay"
                                    @click="selectedBarangay = Barangay">
                                    {{ Barangay }}
                                </SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>

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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useAddPayableController } from '../../../controllers/customer/add_payable_controller'
import { municipalities, navalBarangay, calubianBarangay } from '../../../models/customer/add_customer_model'


const {
    customerName,
    selectedBarangay,
    selectedMunicipality,
    addPayable } = useAddPayableController()

</script>

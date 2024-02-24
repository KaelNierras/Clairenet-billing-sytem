// upcoming_due_controller.ts
import { limit, upComingDueList } from '../../models/dashboard/upcoming_due_model';

export const seeAll = () => {
    limit.value = upComingDueList.value.length; // Show all items
};

export const seeLess = () => {
    limit.value = 3; // Decrease limit by 3, but not less than 3
};
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePlanStore = create(
    persist(
        (set, get) => ({
            plannedItems: [],

            addItem: (item) => {
                const items = get().plannedItems;
                if (items.some((i) => i._id === item._id)) return; // Prevent duplicates
                set({ plannedItems: [...items, item] });
            },

            removeItem: (itemId) => {
                set({
                    plannedItems: get().plannedItems.filter((i) => i._id !== itemId),
                });
            },

            clearPlan: () => set({ plannedItems: [] }),
        }),
        {
            name: 'travel-plan-storage', // unique name
        }
    )
);

export default usePlanStore;

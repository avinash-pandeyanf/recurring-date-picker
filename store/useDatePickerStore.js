import { create } from "zustand";
import { addDays, format } from "date-fns";

const useDatePickerStore = create((set) => ({
  startDate: new Date(),
  endDate: null,
  recurrencePattern: "daily", // default pattern
  recurrenceInterval: 1, // every 1 day/week/month/year
  selectedDaysOfWeek: [], // for weekly recurrence
  nthDayOfMonth: null, // e.g., 2nd Tuesday
  previewDates: [],

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrencePattern: (pattern) => set({ recurrencePattern: pattern }),
  setRecurrenceInterval: (interval) => set({ recurrenceInterval: interval }),
  setSelectedDaysOfWeek: (days) => set({ selectedDaysOfWeek: days }),
  setNthDayOfMonth: (nthDay) => set({ nthDayOfMonth: nthDay }),

  generatePreviewDates: () => {
    set((state) => {
      const { startDate, recurrencePattern, recurrenceInterval } = state;
      let previewDates = [];
      let currentDate = new Date(startDate);

      for (let i = 0; i < 10; i++) {
        // preview next 10 occurrences
        previewDates.push(currentDate);
        switch (recurrencePattern) {
          case "daily":
            currentDate = addDays(currentDate, recurrenceInterval);
            break;
          // Add more cases for weekly, monthly, yearly patterns
          default:
            break;
        }
      }

      return { previewDates };
    });
  },
}));

export default useDatePickerStore;

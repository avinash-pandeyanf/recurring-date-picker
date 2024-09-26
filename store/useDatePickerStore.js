import { create } from "zustand";
import {
  addDays,
  addMonths,
  addYears,
  setDate,
  getDay,
  isSameMonth,
} from "date-fns";

const useDatePickerStore = create((set) => ({
  startDate: new Date(),
  endDate: null,
  recurrencePattern: "daily", // default pattern
  recurrenceInterval: 1, // every 1 day/week/month/year
  selectedDaysOfWeek: [], // for weekly recurrence
  nthDayOfMonth: { dayOfWeek: 2, nth: 2 }, // Example: 2nd Tuesday
  previewDates: [],

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrencePattern: (pattern) => set({ recurrencePattern: pattern }),
  setRecurrenceInterval: (interval) => set({ recurrenceInterval: interval }),
  setSelectedDaysOfWeek: (days) => set({ selectedDaysOfWeek: days }),
  setNthDayOfMonth: (nthDay) => set({ nthDayOfMonth: nthDay }),

  generatePreviewDates: () => {
    set((state) => {
      const {
        startDate,
        recurrencePattern,
        recurrenceInterval,
        nthDayOfMonth,
      } = state;
      let previewDates = [];
      let currentDate = new Date(startDate);

      for (let i = 0; i < 10; i++) {
        // preview next 10 occurrences
        previewDates.push(currentDate);
        switch (recurrencePattern) {
          case "daily":
            currentDate = addDays(currentDate, recurrenceInterval);
            break;

          case "weekly":
            currentDate = addDays(currentDate, 7 * recurrenceInterval);
            break;

          case "monthly":
            currentDate = addMonths(currentDate, recurrenceInterval);
            break;

          case "yearly":
            currentDate = addYears(currentDate, recurrenceInterval);
            break;

          case "nthDayOfMonth":
            // Get nth occurrence of a specific day (e.g., 2nd Tuesday of the month)
            currentDate = getNthDayOfMonth(currentDate, nthDayOfMonth);
            currentDate = addMonths(currentDate, recurrenceInterval);
            break;

          default:
            break;
        }
      }

      return { previewDates };
    });
  },
}));

export default useDatePickerStore;

// Helper function to get the nth occurrence of a specific day in a month
const getNthDayOfMonth = (date, nthDayOfMonth) => {
  const { dayOfWeek, nth } = nthDayOfMonth; // e.g., { dayOfWeek: 2, nth: 2 } for 2nd Tuesday
  let monthStart = new Date(date.getFullYear(), date.getMonth(), 1); // First day of the month
  let day = getDay(monthStart); // Get the day of the week for the first day of the month

  // Calculate the number of days to the first occurrence of the desired day (e.g., first Tuesday)
  let diff = (dayOfWeek - day + 7) % 7;
  let nthDay = setDate(monthStart, 1 + diff + (nth - 1) * 7);

  // Ensure the nth day is still in the same month
  if (!isSameMonth(nthDay, monthStart)) {
    return addMonths(monthStart, 1); // Move to the next month if out of range
  }

  return nthDay;
};

// Add this directive at the top of the file to ensure it's treated as a Client Component
"use client";

import React from "react";
import RecurrenceOptions from "./RecurrenceOptions";
import DatePreview from "./DatePreview";
import DateRangeSelector from "./DateRangeSelector";
import useDatePickerStore from "../store/useDatePickerStore";

const DatePicker = () => {
  const { generatePreviewDates } = useDatePickerStore();

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Recurring Date Picker</h2>
      <DateRangeSelector />
      <RecurrenceOptions />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generatePreviewDates}
      >
        Generate Preview
      </button>
      <DatePreview />
    </div>
  );
};

export default DatePicker;

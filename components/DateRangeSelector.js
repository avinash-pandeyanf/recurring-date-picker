"use client";
import React from "react";
import { format } from "date-fns";
import useDatePickerStore from "../store/useDatePickerStore";

const DateRangeSelector = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useDatePickerStore();

  return (
    <div className="flex flex-col">
      <label className="mb-2">Start Date:</label>
      <input
        type="date"
        className="p-2 border rounded"
        value={format(startDate, "yyyy-MM-dd")}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <label className="mt-4">End Date (optional):</label>
      <input
        type="date"
        className="p-2 border rounded"
        value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
        onChange={(e) =>
          setEndDate(e.target.value ? new Date(e.target.value) : null)
        }
      />
    </div>
  );
};

export default DateRangeSelector;

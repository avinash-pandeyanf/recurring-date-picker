"use client";
import React from "react";
import { format } from "date-fns";
import useDatePickerStore from "../store/useDatePickerStore";

const DatePreview = () => {
  const { previewDates } = useDatePickerStore();

  return (
    <div className="mt-4">
      <h3 className="text-md font-bold mb-2">Recurring Dates Preview:</h3>
      <ul className="list-disc pl-4">
        {previewDates.map((date, index) => (
          <li key={index}>{format(date, "MMM dd, yyyy")}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatePreview;

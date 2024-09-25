"use client";

import React from "react";
import useDatePickerStore from "../store/useDatePickerStore";

const RecurrenceOptions = () => {
  const {
    recurrencePattern,
    setRecurrencePattern,
    recurrenceInterval,
    setRecurrenceInterval,
  } = useDatePickerStore();

  return (
    <div className="flex flex-col">
      <label className="mb-2">Recurrence Pattern:</label>
      <select
        className="p-2 border rounded"
        value={recurrencePattern}
        onChange={(e) => setRecurrencePattern(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <label className="mt-4">Interval:</label>
      <input
        type="number"
        className="p-2 border rounded"
        value={recurrenceInterval}
        onChange={(e) => setRecurrenceInterval(Number(e.target.value))}
        min={1}
      />
    </div>
  );
};

export default RecurrenceOptions;

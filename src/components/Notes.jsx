import React from "react";
import { format } from "date-fns";

const formatRangeLabel = (start, end) => {
  if (!start) {
    return "No range selected";
  }

  if (!end) {
    return `${format(start, "MMM d, yyyy")} (start selected)`;
  }

  return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
};

const Notes = ({
  monthLabel,
  monthNote,
  onMonthNoteChange,
  selectedRange,
  rangeNote,
  onRangeNoteChange,
}) => {
  const hasRangeStart = Boolean(selectedRange.start);

  return (
    <section className="notes-panel">
      <div className="notes-column">
        <label htmlFor="month-note" className="notes-label">
          Monthly memo ({monthLabel})
        </label>
        <textarea
          id="month-note"
          value={monthNote}
          onChange={(event) => onMonthNoteChange(event.target.value)}
          placeholder="Capture goals, reminders, or key deadlines for this month..."
        />
      </div>

      <div className="notes-column">
        <p className="notes-label">Selected range note</p>
        <p className="range-label">{formatRangeLabel(selectedRange.start, selectedRange.end)}</p>
        <textarea
          value={rangeNote}
          onChange={(event) => onRangeNoteChange(event.target.value)}
          placeholder="Add details for the selected day or range..."
          disabled={!hasRangeStart}
        />
      </div>
    </section>
  );
};

export default Notes;

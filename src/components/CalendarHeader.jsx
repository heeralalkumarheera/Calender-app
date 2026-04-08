import React from "react";

const CalendarHeader = ({
  monthLabel,
  onPrevMonth,
  onNextMonth,
  onToday,
  onClearRange,
}) => {
  return (
    <div className="calendar-header">
      <button
        type="button"
        className="nav-btn"
        onClick={onPrevMonth}
        aria-label="Previous month"
      >
        ←
      </button>

      <h2 className="month-title">{monthLabel}</h2>

      <button
        type="button"
        className="nav-btn"
        onClick={onNextMonth}
        aria-label="Next month"
      >
        →
      </button>

      <div className="header-actions">
        <button type="button" className="today-btn" onClick={onToday}>
          Today
        </button>
        <button type="button" className="clear-btn" onClick={onClearRange}>
          Clear Range
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
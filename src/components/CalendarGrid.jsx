import React from "react";
import {
  addDays,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const isBetween = (date, start, end) => {
  if (!start || !end) {
    return false;
  }

  return date > start && date < end;
};

const CalendarGrid = ({ currentDate, selectedRange, onSelectDate }) => {
  const monthStart = startOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));

  const rangeStart = selectedRange.start;
  const rangeEnd = selectedRange.end;
  const today = new Date();

  return (
    <div className="calendar-grid-wrap">
      <div className="week-row">
        {WEEK_DAYS.map((day) => (
          <div className="week-name" key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const isStart = rangeStart && isSameDay(day, rangeStart);
          const isEnd = rangeEnd && isSameDay(day, rangeEnd);
          const inRange = isBetween(day, rangeStart, rangeEnd);
          const outsideMonth = !isSameMonth(day, currentDate);
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          const isToday = isSameDay(day, today);

          const classes = [
            "day-cell",
            outsideMonth ? "outside-month" : "inside-month",
            isWeekend ? "weekend" : "",
            inRange ? "in-range" : "",
            isStart ? "range-start" : "",
            isEnd ? "range-end" : "",
            isToday ? "today" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              type="button"
              key={format(day, "yyyy-MM-dd")}
              className={classes}
              onClick={() => onSelectDate(day)}
              aria-label={format(day, "MMMM d, yyyy")}
            >
              <span className="day-number">{format(day, "d")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
import React, { useEffect, useMemo, useState } from "react";
import { format, isAfter, isBefore, startOfMonth } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import Notes from "./Notes";

const HERO_BY_MONTH = [
  {
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1500&q=80",
    title: "Winter Light",
    subtitle: "A calm wall-planner mood for focused scheduling.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1453771816053-ed5b628c8ee1?auto=format&fit=crop&w=1500&q=80",
    title: "Soft Horizon",
    subtitle: "Keep each week visible and your range plans sharp.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1500&q=80",
    title: "Early Spring",
    subtitle: "Map priorities from kickoff days to final deadlines.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1500&q=80",
    title: "Fresh Tracks",
    subtitle: "Visualize date windows with a clean month canvas.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1500&q=80",
    title: "Warm Mornings",
    subtitle: "Pair your month goals with a focused range plan.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1500&q=80",
    title: "Summer Canopy",
    subtitle: "Track travel blocks, events, and deep-work intervals.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1500&q=80",
    title: "Long Daylight",
    subtitle: "Plan with confidence across every weekend and weekday.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1500&q=80",
    title: "Golden Trails",
    subtitle: "Shape month-long priorities into actionable ranges.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1500&q=80",
    title: "Autumn Air",
    subtitle: "Mark start and finish days with clear visual rhythm.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1500&q=80",
    title: "Copper Evenings",
    subtitle: "Organize project cycles and note key checkpoints.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?auto=format&fit=crop&w=1500&q=80",
    title: "Crisp Dawn",
    subtitle: "A tactile calendar surface with practical note tools.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1500&q=80",
    title: "Quiet December",
    subtitle: "Close the year with clear range planning and reflection.",
  },
];

const RANGE_NOTES_KEY = "wall-calendar-range-notes";

const toMonthKey = (date) => format(date, "yyyy-MM");

const toRangeKey = (start, end) => {
  if (!start) {
    return "";
  }

  const safeEnd = end || start;
  return `${format(start, "yyyy-MM-dd")}__${format(safeEnd, "yyyy-MM-dd")}`;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [monthNote, setMonthNote] = useState("");
  const [rangeNotes, setRangeNotes] = useState({});

  const monthLabel = useMemo(
    () => format(currentDate, "MMMM yyyy"),
    [currentDate]
  );

  const monthTheme = HERO_BY_MONTH[currentDate.getMonth()];

  const monthStorageKey = useMemo(
    () => `wall-calendar-month-note-${toMonthKey(currentDate)}`,
    [currentDate]
  );

  const rangeKey = useMemo(
    () => toRangeKey(selectedRange.start, selectedRange.end),
    [selectedRange.end, selectedRange.start]
  );

  const rangeNote = rangeKey ? rangeNotes[rangeKey] || "" : "";

  useEffect(() => {
    const storedNote = localStorage.getItem(monthStorageKey);
    setMonthNote(storedNote || "");
  }, [monthStorageKey]);

  useEffect(() => {
    const raw = localStorage.getItem(RANGE_NOTES_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        setRangeNotes(parsed);
      }
    } catch {
      setRangeNotes({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(monthStorageKey, monthNote);
  }, [monthStorageKey, monthNote]);

  useEffect(() => {
    localStorage.setItem(RANGE_NOTES_KEY, JSON.stringify(rangeNotes));
  }, [rangeNotes]);

  const handleSelectDate = (date) => {
    setSelectedRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }

      if (isBefore(date, prev.start)) {
        return { start: date, end: null };
      }

      if (isAfter(date, prev.start) || format(date, "yyyy-MM-dd") === format(prev.start, "yyyy-MM-dd")) {
        return { start: prev.start, end: date };
      }

      return { start: date, end: null };
    });
  };

  const handleRangeNoteChange = (value) => {
    if (!rangeKey) {
      return;
    }

    setRangeNotes((prev) => ({
      ...prev,
      [rangeKey]: value,
    }));
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(startOfMonth(today));
    setSelectedRange({ start: today, end: today });
  };

  const clearRange = () => {
    setSelectedRange({ start: null, end: null });
  };

  return (
    <div className="wall-calendar-shell">
      <aside className="hero-panel">
        <div className="binder-rings" aria-hidden="true">
          <span className="ring" />
          <span className="ring" />
          <span className="ring" />
          <span className="ring" />
        </div>
        <img src={monthTheme.image} alt={monthTheme.title} className="hero-image" />
        <div className="hero-overlay">
          <p className="hero-kicker">Wall Calendar</p>
          <p className="hero-month-chip">{monthLabel}</p>
          <h1>{monthTheme.title}</h1>
          <p>{monthTheme.subtitle}</p>
        </div>
      </aside>

      <section className="planner-panel">
        <CalendarHeader
          monthLabel={monthLabel}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          onClearRange={clearRange}
        />

        <CalendarGrid
          currentDate={currentDate}
          selectedRange={selectedRange}
          onSelectDate={handleSelectDate}
        />
        <Notes
          monthLabel={monthLabel}
          monthNote={monthNote}
          onMonthNoteChange={setMonthNote}
          selectedRange={selectedRange}
          rangeNote={rangeNote}
          onRangeNoteChange={handleRangeNoteChange}
        />
      </section>
    </div>
  );
};

export default Calendar;
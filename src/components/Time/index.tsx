import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style/index.less";

// ============ Helpers ============

const WEEKDAY_ZH = ["日", "一", "二", "三", "四", "五", "六"];

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// ============ Time Component ============

export interface TimeProps {
  format?: "full" | "compact" | "date";
  hour12?: boolean;
  showSeconds?: boolean;
  showWeekday?: boolean;
  showDate?: boolean;
  color?: "primary" | "secondary" | "accent";
  size?: "small" | "medium" | "large";
  glow?: boolean;
  scanEffect?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Time: React.FC<TimeProps> = ({
  format: fmt = "full",
  hour12 = false,
  showSeconds = true,
  showWeekday: sw = true,
  showDate: sd = true,
  color = "primary",
  size = "medium",
  glow = true,
  scanEffect = false,
  className = "",
  style,
}) => {
  const [now, setNow] = useState(new Date());
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      setNow(new Date());
      timerRef.current = setTimeout(tick, 1000 - Date.now() % 1000);
    };
    timerRef.current = setTimeout(tick, 1000 - Date.now() % 1000);
    return () => {
      running = false;
      clearTimeout(timerRef.current);
    };
  }, []);

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const y = now.getFullYear();
  const M = now.getMonth() + 1;
  const d = now.getDate();
  const w = now.getDay();

  let displayHour = h;
  let ampm = "";
  if (hour12) {
    ampm = h >= 12 ? "PM" : "AM";
    displayHour = h % 12;
    if (displayHour === 0) displayHour = 12;
  }

  const timeStr = showSeconds
    ? `${pad(displayHour)}:${pad(m)}:${pad(s)}`
    : `${pad(displayHour)}:${pad(m)}`;

  const dateStr = `${y}-${pad(M)}-${pad(d)}`;
  const weekdayStr = `周${WEEKDAY_ZH[w]}`;

  const classes = [
    "cyberpunk-time",
    `time-${color}`,
    `time-${size}`,
    glow ? "time-glow" : "",
    scanEffect ? "time-scan" : "",
    `time-${fmt}`,
    className,
  ].filter(Boolean).join(" ");

  const showDateBlock = sd && (fmt === "full" || fmt === "date");
  const showWeekdayBlock = sw && (fmt === "full" || fmt === "date");
  const showTimeBlock = fmt === "full" || fmt === "compact";

  return (
    <div className={classes} style={style}>
      <div className="time-inner">
        {showWeekdayBlock && (
          <span className="time-weekday">{weekdayStr}</span>
        )}
        {showDateBlock && (
          <span className="time-date">{dateStr}</span>
        )}
        {showTimeBlock && (
          <span className="time-clock">
            <span className="time-digits">{timeStr}</span>
            {hour12 && <span className="time-ampm">{ampm}</span>}
          </span>
        )}
      </div>
      {scanEffect && <div className="time-scanline" />}
    </div>
  );
};

// ============ TimePicker Component ============

export interface TimePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  format?: "HH:mm" | "HH:mm:ss";
  placeholder?: string;
  disabled?: boolean;
  color?: "primary" | "secondary" | "accent";
  size?: "small" | "medium" | "large";
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  defaultValue = "",
  onChange,
  format: timeFormat = "HH:mm",
  placeholder = "选择时间",
  disabled = false,
  color = "primary",
  size = "medium",
  glow = false,
  className = "",
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const setValue = useCallback(
    (newVal: string) => {
      if (value === undefined) setInternalValue(newVal);
      onChange?.(newVal);
    },
    [value, onChange],
  );

  const parseTime = (): { h: number; m: number; s: number } => {
    const parts = currentValue.split(":");
    return {
      h: parseInt(parts[0]) || 0,
      m: parseInt(parts[1]) || 0,
      s: timeFormat === "HH:mm:ss" ? parseInt(parts[2]) || 0 : 0,
    };
  };

  const { h, m, s } = parseTime();

  const clamp = (v: number, max: number) => Math.max(0, Math.min(max, v));

  const setPart = (part: "h" | "m" | "s", val: number) => {
    const max = part === "h" ? 23 : 59;
    const np = parseTime();
    if (part === "h") np.h = clamp(val, max);
    if (part === "m") np.m = clamp(val, max);
    if (part === "s") np.s = clamp(val, max);
    setValue(
      timeFormat === "HH:mm:ss"
        ? `${pad(np.h)}:${pad(np.m)}:${pad(np.s)}`
        : `${pad(np.h)}:${pad(np.m)}`,
    );
  };

  const step = (part: "h" | "m" | "s", delta: 1 | -1) => {
    const max = part === "h" ? 23 : 59;
    const cur = part === "h" ? h : part === "m" ? m : s;
    setPart(part, delta > 0 ? (cur >= max ? 0 : cur + 1) : cur <= 0 ? max : cur - 1);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const classes = [
    "cyberpunk-timepicker",
    `timepicker-${color}`,
    `timepicker-${size}`,
    glow ? "timepicker-glow" : "",
    disabled ? "timepicker-disabled" : "",
    className,
  ].filter(Boolean).join(" ");

  const panelClasses = [
    "timepicker-panel",
    `timepicker-panel-${color}`,
    glow ? "timepicker-panel-glow" : "",
  ].filter(Boolean).join(" ");

  const Col = ({ part, label }: { part: "h" | "m" | "s"; label: string }) => {
    const val = part === "h" ? h : part === "m" ? m : s;
    return (
      <div className="timepicker-col">
        <button
          className="timepicker-arrow"
          onMouseDown={(e) => {
            e.preventDefault();
            step(part, 1);
          }}
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <input
          className="timepicker-col-value"
          value={pad(val)}
          onChange={(e) => {
            const n = parseInt(e.target.value);
            if (!isNaN(n)) setPart(part, n);
          }}
          onFocus={() => {}}
        />
        <button
          className="timepicker-arrow"
          onMouseDown={(e) => {
            e.preventDefault();
            step(part, -1);
          }}
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="timepicker-col-label">{label}</div>
      </div>
    );
  };

  return (
    <div className={classes} style={style}>
      <div
        ref={triggerRef}
        className="timepicker-trigger"
        onClick={() => !disabled && setOpen(!open)}
      >
        <span className={currentValue ? "timepicker-value" : "timepicker-placeholder"}>
          {currentValue || placeholder}
        </span>
        <span className="timepicker-icon">
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
      </div>

      {open && (
        <div ref={panelRef} className={panelClasses}>
          <div className="timepicker-columns">
            <Col part="h" label="时" />
            <span className="timepicker-sep">:</span>
            <Col part="m" label="分" />
            {timeFormat === "HH:mm:ss" && (
              <>
                <span className="timepicker-sep">:</span>
                <Col part="s" label="秒" />
              </>
            )}
          </div>
          <div className="timepicker-actions">
            <button className="timepicker-btn" onClick={() => { setValue(""); setOpen(false); }}>
              清除
            </button>
            <button
              className="timepicker-btn timepicker-btn-now"
              onClick={() => {
                const n = new Date();
                setValue(
                  timeFormat === "HH:mm:ss"
                    ? `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`
                    : `${pad(n.getHours())}:${pad(n.getMinutes())}`,
                );
              }}
            >
              此刻
            </button>
            <button className="timepicker-btn timepicker-btn-confirm" onClick={() => setOpen(false)}>
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============ DatePicker Component ============

export interface DatePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  color?: "primary" | "secondary" | "accent";
  size?: "small" | "medium" | "large";
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue = "",
  onChange,
  placeholder = "选择日期",
  disabled = false,
  color = "primary",
  size = "medium",
  glow = false,
  className = "",
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const setValue = useCallback(
    (newVal: string) => {
      if (value === undefined) setInternalValue(newVal);
      onChange?.(newVal);
    },
    [value, onChange],
  );

  const today = new Date();
  const parsed = currentValue ? new Date(currentValue + "T00:00:00") : today;
  const [viewYear, setViewYear] = useState(
    !isNaN(parsed.getTime()) ? parsed.getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    !isNaN(parsed.getTime()) ? parsed.getMonth() : today.getMonth(),
  );

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selectDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    setValue(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  };

  const isToday = (day: number) =>
    viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();

  const isSelected = (day: number) => {
    if (!currentValue) return false;
    const p = new Date(currentValue + "T00:00:00");
    if (isNaN(p.getTime())) return false;
    return viewYear === p.getFullYear() && viewMonth === p.getMonth() && day === p.getDate();
  };

  const classes = [
    "cyberpunk-datepicker",
    `datepicker-${color}`,
    `datepicker-${size}`,
    glow ? "datepicker-glow" : "",
    disabled ? "datepicker-disabled" : "",
    className,
  ].filter(Boolean).join(" ");

  const panelClasses = [
    "datepicker-panel",
    `datepicker-panel-${color}`,
    glow ? "datepicker-panel-glow" : "",
  ].filter(Boolean).join(" ");

  const weekHeaders = ["日", "一", "二", "三", "四", "五", "六"];

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(<div key={`empty-${i}`} className="datepicker-cell datepicker-cell-empty" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(
      <div
        key={`day-${d}`}
        className={[
          "datepicker-cell",
          isSelected(d) ? "datepicker-cell-selected" : "",
          isToday(d) ? "datepicker-cell-today" : "",
        ].filter(Boolean).join(" ")}
        onClick={() => selectDate(d)}
      >
        {d}
      </div>,
    );
  }

  return (
    <div className={classes} style={style}>
      <div
        ref={triggerRef}
        className="datepicker-trigger"
        onClick={() => !disabled && setOpen(!open)}
      >
        <span className={currentValue ? "datepicker-value" : "datepicker-placeholder"}>
          {currentValue || placeholder}
        </span>
        <span className="datepicker-icon">
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
      </div>

      {open && (
        <div ref={panelRef} className={panelClasses}>
          <div className="datepicker-header">
            <button className="datepicker-nav" onClick={prevMonth}>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span className="datepicker-header-title">
              {viewYear}年 {MONTHS[viewMonth]}月
            </span>
            <button className="datepicker-nav" onClick={nextMonth}>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
          <div className="datepicker-weekdays">
            {weekHeaders.map((w) => (
              <span key={w} className="datepicker-weekday">{w}</span>
            ))}
          </div>
          <div className="datepicker-grid">{cells}</div>
          <div className="datepicker-actions">
            <button className="datepicker-btn" onClick={() => { setValue(""); setOpen(false); }}>
              清除
            </button>
            <button
              className="datepicker-btn datepicker-btn-today"
              onClick={() => {
                const n = new Date();
                setValue(`${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`);
                setOpen(false);
              }}
            >
              今天
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { TimePicker, DatePicker };
export default Time;

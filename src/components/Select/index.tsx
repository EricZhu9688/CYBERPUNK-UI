import React, { useState, useRef, useEffect, useCallback } from "react";
import "./style/index.less";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  options?: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  glow?: boolean;
  label?: string;
  clearable?: boolean;
  onChange?: (value: string | number) => void;
  className?: string;
}

/* ── inline arrow SVG placeholder ── */
const ArrowIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 4 l4 4 l4 -4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Select: React.FC<SelectProps> = ({
  options = [],
  value,
  defaultValue,
  placeholder = "请选择",
  disabled = false,
  size = "medium",
  glow = false,
  label,
  clearable = false,
  onChange,
  className = "",
}) => {
  const [innerValue, setInnerValue] = useState<string | number | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : innerValue;
  const selectedOption = options.find((o) => o.value === currentValue);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  const handleSelect = (val: string | number, optDisabled?: boolean) => {
    if (optDisabled) return;
    if (value === undefined) setInnerValue(val);
    onChange?.(val);
    close();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value === undefined) setInnerValue(undefined);
    onChange?.("");
    close();
  };

  const toggleOpen = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const wrapperClasses = [
    "cyberpunk-select-wrapper",
    size !== "medium" ? `select-${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const triggerClasses = [
    "select-trigger",
    open ? "select-open" : "",
    disabled ? "select-disabled" : "",
    glow ? "select-glow" : "",
    size !== "medium" ? `select-${size}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {label && <label className="select-label">{label}</label>}
      <button className={triggerClasses} onClick={toggleOpen} type="button">
        <span className={selectedOption ? "" : "select-placeholder"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {clearable && currentValue !== undefined && (
            <span className="select-clear" onClick={handleClear}>
              ×
            </span>
          )}
          <span className={`select-arrow ${open ? "arrow-open" : ""}`}>
            <ArrowIcon />
          </span>
        </span>
      </button>
      {open && (
        <div className="select-dropdown">
          {options.length === 0 ? (
            <div className="select-empty">无选项</div>
          ) : (
            options.map((opt) => (
              <div
                key={opt.value}
                className={`select-option ${currentValue === opt.value ? "option-selected" : ""} ${opt.disabled ? "option-disabled" : ""}`}
                onClick={() => handleSelect(opt.value, opt.disabled)}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;

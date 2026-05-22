import React from "react";
import "./style/index.less";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  color?: "primary" | "secondary" | "accent";
  glow?: boolean;
  label?: React.ReactNode;
  value?: string | number;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export interface CheckboxGroupProps {
  options?: (string | { label: string; value: string | number; disabled?: boolean })[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  onChange?: (checkedValues: (string | number)[]) => void;
  className?: string;
}

/* ── inline SVG icons (placeholder, swap with real icon assets later) ── */
const CheckIcon = () => (
  <svg viewBox="0 0 12 12" className="checkbox-icon" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 6 l3 4 l5 -8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IndeterminateIcon = () => (
  <svg viewBox="0 0 12 12" className="checkbox-icon" fill="currentColor" stroke="none">
    <rect x="1.5" y="5.5" width="9" height="1" rx="0.5" />
  </svg>
);

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  color = "primary",
  glow = false,
  label,
  onChange,
  className = "",
}) => {
  const [innerChecked, setInnerChecked] = React.useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : innerChecked;

  const handleClick = () => {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) setInnerChecked(next);
    onChange?.(!indeterminate ? next : true);
  };

  const classes = [
    "cyberpunk-checkbox",
    isChecked ? "checkbox-checked" : "",
    disabled ? "checkbox-disabled" : "",
    glow ? "checkbox-glow" : "",
    color !== "primary" ? `checkbox-${color}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} onClick={handleClick}>
      <input type="checkbox" className="checkbox-input" checked={isChecked} readOnly />
      <span className="checkbox-box">
        {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
      </span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options = [],
  value,
  defaultValue = [],
  disabled = false,
  direction = "vertical",
  onChange,
  className = "",
}) => {
  const [innerValue, setInnerValue] = React.useState<(string | number)[]>(defaultValue);
  const currentValue = value !== undefined ? value : innerValue;

  const toggle = (val: string | number) => {
    const next = currentValue.includes(val)
      ? currentValue.filter((v) => v !== val)
      : [...currentValue, val];
    if (value === undefined) setInnerValue(next);
    onChange?.(next);
  };

  return (
    <div className={`cyberpunk-checkbox-group ${direction === "horizontal" ? "group-horizontal" : ""} ${className}`}>
      {options.map((opt, i) => {
        const label = typeof opt === "string" ? opt : opt.label;
        const val = typeof opt === "string" ? opt : opt.value;
        const optDisabled = typeof opt === "object" ? opt.disabled : false;
        return (
          <Checkbox
            key={i}
            label={label}
            checked={currentValue.includes(val)}
            disabled={disabled || optDisabled}
            onChange={() => toggle(val)}
          />
        );
      })}
    </div>
  );
};

export default Checkbox;

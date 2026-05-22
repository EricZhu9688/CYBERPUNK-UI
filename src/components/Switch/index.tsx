import React from "react";
import "./style/index.less";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "accent";
  glow?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  size = "medium",
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
    onChange?.(next);
  };

  const classes = [
    "cyberpunk-switch",
    isChecked ? "switch-checked" : "",
    disabled ? "switch-disabled" : "",
    glow ? "switch-glow" : "",
    color !== "primary" ? `switch-${color}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} onClick={handleClick}>
      <span className={`switch-track ${size !== "medium" ? `switch-${size}` : ""}`}>
        <span className="switch-thumb" />
      </span>
      {label && <span className="switch-label">{label}</span>}
    </label>
  );
};

export default Switch;

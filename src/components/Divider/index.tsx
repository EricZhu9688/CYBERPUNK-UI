import React from "react";
import "./style/index.less";

export interface DividerProps {
  type?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "gradient";
  glow?: boolean;
  color?: "primary" | "secondary" | "accent";
  orientation?: "center" | "left" | "right";
  children?: React.ReactNode;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  type = "horizontal",
  variant = "gradient",
  glow = false,
  color = "primary",
  orientation = "center",
  children,
  className = "",
}) => {
  const classes = [
    "cyberpunk-divider",
    `divider-${type}`,
    variant !== "gradient" ? `divider-${variant}` : "",
    glow ? "divider-glow" : "",
    color !== "primary" ? `divider-${color}` : "",
    children && orientation !== "center" ? `divider-${orientation}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="separator">
      {children && <span className="divider-text">{children}</span>}
    </div>
  );
};

export default Divider;

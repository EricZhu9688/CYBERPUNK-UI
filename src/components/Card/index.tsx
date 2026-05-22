import React from "react";
import "./style/index.less";

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: string;
  bordered?: boolean;
  glow?: boolean;
  color?: "primary" | "secondary" | "accent";
  hoverable?: boolean;
  size?: "small" | "medium";
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  extra,
  cover,
  bordered = false,
  glow = false,
  color = "primary",
  hoverable = false,
  size = "medium",
  footer,
  children,
  className = "",
  style,
  onClick,
}) => {
  const classes = [
    "cyberpunk-card",
    bordered ? "card-bordered" : "",
    glow ? "card-glow" : "",
    color !== "primary" ? `card-${color}` : "",
    hoverable ? "card-hoverable" : "",
    size === "small" ? "card-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} onClick={onClick}>
      {cover && (
        <div className="card-cover">
          <img src={cover} alt="" />
        </div>
      )}
      {title && (
        <div className="card-header">
          <div className="card-header-left">{title}</div>
          {extra && <div className="card-extra">{extra}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;

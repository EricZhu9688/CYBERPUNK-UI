import React, { forwardRef, ButtonHTMLAttributes } from "react";
import "./style/index.less";

export type ButtonType = "primary" | "secondary" | "accent" | "ghost" | "danger";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonShape = "default" | "round" | "square";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮形状 */
  shape?: ButtonShape;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否块级元素 */
  block?: boolean;
  /** 是否显示边框发光效果 */
  glow?: boolean;
  /** 是否显示扫描线效果 */
  scanEffect?: boolean;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 图标位置 */
  iconPosition?: "left" | "right";
  /** 点击波纹效果 */
  ripple?: boolean;
  /** 自定义类名 */
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "primary",
      size = "medium",
      shape = "default",
      disabled = false,
      loading = false,
      block = false,
      glow = true,
      scanEffect = false,
      icon,
      iconPosition = "left",
      ripple = true,
      className = "",
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      
      if (ripple && !disabled) {
        createRippleEffect(e);
      }
      
      onClick?.(e);
    };

    const createRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
      circle.classList.add("cyberpunk-ripple");

      const ripple = button.getElementsByClassName("cyberpunk-ripple")[0];
      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    };

    const getTypeClass = () => {
      switch (type) {
        case "primary":
          return "btn-primary";
        case "secondary":
          return "btn-secondary";
        case "accent":
          return "btn-accent";
        case "ghost":
          return "btn-ghost";
        case "danger":
          return "btn-danger";
        default:
          return "btn-primary";
      }
    };

    const getSizeClass = () => {
      switch (size) {
        case "small":
          return "btn-sm";
        case "medium":
          return "btn-md";
        case "large":
          return "btn-lg";
        default:
          return "btn-md";
      }
    };

    const getShapeClass = () => {
      switch (shape) {
        case "round":
          return "btn-round";
        case "square":
          return "btn-square";
        default:
          return "btn-default";
      }
    };

    const buttonClasses = [
      "cyberpunk-button",
      getTypeClass(),
      getSizeClass(),
      getShapeClass(),
      disabled ? "btn-disabled" : "",
      loading ? "btn-loading" : "",
      block ? "btn-block" : "",
      glow ? "btn-glow" : "",
      scanEffect ? "btn-scan" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        {...rest}
      >
        {loading && (
          <span className="btn-loading-spinner">
            <span className="spinner-dot" />
            <span className="spinner-dot" />
            <span className="spinner-dot" />
          </span>
        )}
        
        {!loading && icon && iconPosition === "left" && (
          <span className="btn-icon-left">{icon}</span>
        )}
        
        <span className="btn-content">{children}</span>
        
        {!loading && icon && iconPosition === "right" && (
          <span className="btn-icon-right">{icon}</span>
        )}
        
        {scanEffect && <span className="btn-scan-line" />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
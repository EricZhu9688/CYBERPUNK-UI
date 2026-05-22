import React, { useRef } from "react";
import "./style/index.less";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: "small" | "medium" | "large";
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearable?: boolean;
  glow?: boolean;
  scanEffect?: boolean;
  showCount?: boolean;
  maxLength?: number;
  onClear?: () => void;
}

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: "small" | "medium" | "large";
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  glow?: boolean;
  scanEffect?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "medium",
      label,
      required,
      error,
      helperText,
      prefix,
      suffix,
      clearable = false,
      glow = false,
      scanEffect = false,
      showCount,
      maxLength,
      className = "",
      value,
      onChange,
      onClear,
      disabled,
      readOnly,
      type = "text",
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || innerRef;

    const classes = [
      "cyberpunk-input",
      size !== "medium" ? `input-${size}` : "",
      glow ? "input-glow" : "",
      scanEffect ? "input-scan" : "",
      disabled ? "input-disabled" : "",
      readOnly ? "input-readonly" : "",
      error ? "input-error" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const wrapperClasses = [
      "cyberpunk-input-wrapper",
      prefix ? "input-has-prefix" : "",
      suffix || clearable ? "input-has-suffix" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="input-label">
            {label}
            {required && <span className="input-required">*</span>}
          </label>
        )}
        <div className="input-field-wrapper">
          {prefix && <span className="input-prefix">{prefix}</span>}
          <input
            ref={inputRef}
            className={classes}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            type={type}
            maxLength={maxLength}
            {...rest}
          />
          {suffix && !clearable && <span className="input-suffix">{suffix}</span>}
          {clearable && value && (
            <button
              className="input-clear-btn"
              onClick={() => {
                onClear?.();
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "value",
                )?.set;
                nativeInputValueSetter?.call(inputRef.current, "");
                inputRef.current?.dispatchEvent(
                  new Event("input", { bubbles: true }),
                );
              }}
              type="button"
            >
              ×
            </button>
          )}
        </div>
        {(error || helperText) && (
          <div className={`input-helper-text ${error ? "helper-error" : ""}`}>
            {error || helperText}
          </div>
        )}
        {showCount && (
          <div className="input-count">
            {String(value ?? "").length}
            {maxLength !== undefined ? ` / ${maxLength}` : ""}
          </div>
        )}
      </div>
    );
  },
);

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = "medium",
      label,
      required,
      error,
      helperText,
      glow = false,
      scanEffect = false,
      showCount,
      maxLength,
      className = "",
      value,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      "cyberpunk-input",
      "cyberpunk-textarea",
      size !== "medium" ? `input-${size}` : "",
      glow ? "input-glow" : "",
      scanEffect ? "input-scan" : "",
      error ? "input-error" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="cyberpunk-input-wrapper">
        {label && (
          <label className="input-label">
            {label}
            {required && <span className="input-required">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={classes}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          {...rest}
        />
        {(error || helperText) && (
          <div className={`input-helper-text ${error ? "helper-error" : ""}`}>
            {error || helperText}
          </div>
        )}
        {showCount && (
          <div className="input-count">
            {String(value ?? "").length}
            {maxLength !== undefined ? ` / ${maxLength}` : ""}
          </div>
        )}
      </div>
    );
  },
);

export default Input;

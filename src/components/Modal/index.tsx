import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./style/index.less";

export interface ModalProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  size?: "small" | "medium" | "large" | "full";
  closable?: boolean;
  maskClosable?: boolean;
  glow?: boolean;
  scanLine?: boolean;
  zIndex?: number;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  destroyOnClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open = false,
  title,
  children,
  footer,
  size = "medium",
  closable = true,
  maskClosable = true,
  glow = false,
  scanLine = false,
  zIndex,
  onClose,
  className = "",
  style,
  destroyOnClose = false,
}) => {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closable) onClose?.();
    },
    [closable, onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, handleEsc]);

  if (destroyOnClose && !open) return null;
  if (!open) return null;

  const modalContent = (
    <div
      className={`cyberpunk-modal-overlay ${scanLine ? "overlay-scan" : ""}`}
      onClick={maskClosable ? onClose : undefined}
      style={zIndex ? { zIndex } : undefined}
    >
      <div
        className={`cyberpunk-modal modal-${size} ${glow ? "modal-glow" : ""} ${className}`}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal-header">
            <span>{title}</span>
            {closable && (
              <button className="modal-close" onClick={onClose} type="button">
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;

import React, { useState, useRef, useEffect } from "react";
import "./style/index.less";

export interface CollapseItem {
  key: string | number;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export interface CollapseProps {
  items?: CollapseItem[];
  activeKeys?: (string | number)[];
  defaultActiveKeys?: (string | number)[];
  accordion?: boolean;
  bordered?: boolean;
  glow?: boolean;
  size?: "small" | "medium";
  onChange?: (activeKeys: (string | number)[]) => void;
  className?: string;
}

/* ── inline arrow SVG placeholder ── */
const ArrowIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 4 l4 4 l4 -4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CollapsePanel: React.FC<{
  item: CollapseItem;
  active: boolean;
  onToggle: () => void;
  size?: "small" | "medium";
}> = ({ item, active, onToggle, size }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(active ? bodyRef.current.scrollHeight : 0);
    }
  }, [active]);

  return (
    <div className={`collapse-item ${active ? "item-active" : ""} ${item.disabled ? "item-disabled" : ""}`}>
      <div className="collapse-header" onClick={() => !item.disabled && onToggle()}>
        <div className="collapse-header-left">
          <span className={`collapse-arrow ${active ? "arrow-active" : ""}`}>
            <ArrowIcon />
          </span>
          {item.label}
        </div>
        {item.extra && <span className="collapse-extra">{item.extra}</span>}
      </div>
      <div className="collapse-body" style={{ height }}>
        <div ref={bodyRef} className="collapse-content">
          {item.children}
        </div>
      </div>
    </div>
  );
};

const Collapse: React.FC<CollapseProps> = ({
  items = [],
  activeKeys,
  defaultActiveKeys = [],
  accordion = false,
  bordered = false,
  glow = false,
  size = "medium",
  onChange,
  className = "",
}) => {
  const [innerKeys, setInnerKeys] = useState<(string | number)[]>(defaultActiveKeys);
  const currentKeys = activeKeys !== undefined ? activeKeys : innerKeys;

  const toggle = (key: string | number) => {
    let next: (string | number)[];
    if (accordion) {
      next = currentKeys.includes(key) ? [] : [key];
    } else {
      next = currentKeys.includes(key)
        ? currentKeys.filter((k) => k !== key)
        : [...currentKeys, key];
    }
    if (activeKeys === undefined) setInnerKeys(next);
    onChange?.(next);
  };

  const classes = [
    "cyberpunk-collapse",
    bordered ? "collapse-bordered" : "",
    glow ? "collapse-glow" : "",
    size === "small" ? "collapse-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {items.map((item) => (
        <CollapsePanel
          key={item.key}
          item={item}
          active={currentKeys.includes(item.key)}
          onToggle={() => toggle(item.key)}
          size={size}
        />
      ))}
    </div>
  );
};

export default Collapse;

import React, { useState, useEffect, useRef } from "react";
import "./style/index.less";

export interface TabItem {
  /** Tab 的唯一标识 */
  key: string;
  /** Tab 显示文本 */
  label: React.ReactNode;
  /** Tab 内容 */
  children: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 徽标数量 */
  badge?: number;
  /** 是否显示红点 */
  dot?: boolean;
}

export interface TabsProps {
  /** Tab 项数组 */
  items: TabItem[];
  /** 当前激活的 Tab key */
  activeKey?: string;
  /** 默认激活的 Tab key */
  defaultActiveKey?: string;
  /** Tab 改变时的回调 */
  onChange?: (key: string) => void;
  /** Tab 位置 */
  tabPosition?: "top" | "bottom" | "left" | "right";
  /** Tab 类型 */
  type?: "line" | "card" | "editable-card";
  /** Tab 大小 */
  size?: "small" | "medium" | "large";
  /** 是否居中显示 */
  centered?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示动画指示器 */
  animated?: boolean;
  /** 是否销毁非活动 Tab 内容 */
  destroyInactiveTabPane?: boolean;
  /** 是否可滚动 */
  scrollable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否显示发光效果 */
  glowEffect?: boolean;
  /** 是否显示扫描线 */
  scanLine?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  tabPosition = "top",
  type = "line",
  size = "medium",
  centered = false,
  bordered = true,
  animated = true,
  destroyInactiveTabPane = false,
  scrollable = false,
  className = "",
  style,
  glowEffect = true,
  scanLine = true,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    activeKey || defaultActiveKey || (items.length > 0 ? items[0].key : "")
  );
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;
  const activeTab = items.find((item) => item.key === currentActiveKey);

  useEffect(() => {
    updateIndicator();
  }, [currentActiveKey, items, tabPosition]);

  const updateIndicator = () => {
    const activeTabElement = tabRefs.current.get(currentActiveKey);
    if (!activeTabElement || !animated) return;

    const containerRect = tabsContainerRef.current?.getBoundingClientRect();
    const tabRect = activeTabElement.getBoundingClientRect();

    if (!containerRect) return;

    const isVertical = tabPosition === "left" || tabPosition === "right";

    if (isVertical) {
      setIndicatorStyle({
        top: tabRect.top - containerRect.top,
        height: tabRect.height,
        width: 3,
        [tabPosition === "left" ? "right" : "left"]: 0,
      });
    } else {
      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
        height: 3,
        [tabPosition === "top" ? "bottom" : "top"]: 0,
      });
    }
  };

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return;

    if (activeKey === undefined) {
      setInternalActiveKey(key);
    }

    onChange?.(key);
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "tabs-sm";
      case "medium":
        return "tabs-md";
      case "large":
        return "tabs-lg";
      default:
        return "tabs-md";
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case "line":
        return "tabs-line";
      case "card":
        return "tabs-card";
      case "editable-card":
        return "tabs-editable-card";
      default:
        return "tabs-line";
    }
  };

  const tabsClasses = [
    "cyberpunk-tabs",
    `tabs-${tabPosition}`,
    getSizeClass(),
    getTypeClass(),
    centered ? "tabs-centered" : "",
    bordered ? "tabs-bordered" : "",
    scrollable ? "tabs-scrollable" : "",
    glowEffect ? "tabs-glow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderTabNav = () => {
    return (
      <div className={`tabs-nav ${scrollable ? "tabs-nav-scrollable" : ""}`}>
        <div
          ref={tabsContainerRef}
          className="tabs-nav-container"
          style={{ justifyContent: centered ? "center" : "flex-start" }}
        >
          {items.map((item) => {
            const isActive = item.key === currentActiveKey;
            const tabClasses = [
              "tabs-tab",
              isActive ? "tabs-tab-active" : "",
              item.disabled ? "tabs-tab-disabled" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={item.key}
                ref={(el) => {
                  if (el) {
                    tabRefs.current.set(item.key, el);
                  } else {
                    tabRefs.current.delete(item.key);
                  }
                }}
                className={tabClasses}
                onClick={() => handleTabClick(item.key, item.disabled)}
              >
                {item.icon && <span className="tabs-tab-icon">{item.icon}</span>}
                <span className="tabs-tab-label">{item.label}</span>
                {(item.badge || item.dot) && (
                  <span className="tabs-tab-badge">
                    {item.dot ? (
                      <span className="tabs-badge-dot" />
                    ) : item.badge ? (
                      <span className="tabs-badge-count">{item.badge > 99 ? "99+" : item.badge}</span>
                    ) : null}
                  </span>
                )}
                {glowEffect && isActive && <span className="tabs-tab-glow" />}
              </div>
            );
          })}
          {animated && <div className="tabs-indicator" style={indicatorStyle} />}
          {scanLine && <div className="tabs-scan-line" />}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (!activeTab) return null;

    if (destroyInactiveTabPane) {
      return (
        <div className="tabs-content">
          <div className="tabs-tabpane tabs-tabpane-active">{activeTab.children}</div>
        </div>
      );
    }

    return (
      <div className="tabs-content">
        {items.map((item) => (
          <div
            key={item.key}
            className={`tabs-tabpane ${item.key === currentActiveKey ? "tabs-tabpane-active" : ""}`}
            style={{ display: item.key === currentActiveKey ? "block" : "none" }}
          >
            {item.children}
          </div>
        ))}
      </div>
    );
  };

  const renderVerticalTabs = () => (
    <div className="tabs-vertical">
      {renderTabNav()}
      {renderTabContent()}
    </div>
  );

  const renderHorizontalTabs = () => {
    const navFirst = tabPosition === "top" || tabPosition === "left";
    return (
      <>
        {navFirst && renderTabNav()}
        {renderTabContent()}
        {!navFirst && renderTabNav()}
      </>
    );
  };

  return (
    <div className={tabsClasses} style={style}>
      {tabPosition === "left" || tabPosition === "right" ? renderVerticalTabs() : renderHorizontalTabs()}
    </div>
  );
};

export default Tabs;
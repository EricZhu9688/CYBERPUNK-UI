import React, { useState, useRef, useCallback, useMemo } from "react";
import { iconDefs, iconCategories } from "./icons";
import type { IconDef, IconCategory } from "./icons";
import "./style/index.less";

export type IconLibraryColor = "primary" | "secondary" | "accent";

export interface IconLibraryProps {
  color?: IconLibraryColor;
  defaultSize?: number;
  downloadable?: boolean;
  defaultFormat?: "webp" | "png";
  columns?: number;
  showSearch?: boolean;
  showCategories?: boolean;
  showToolbar?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onIconClick?: (icon: IconDef) => void;
}

const svgToDataUrl = (svgEl: SVGSVGElement, format: "webp" | "png"): Promise<string> => {
  return new Promise((resolve, reject) => {
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 4;
      canvas.width = 24 * scale;
      canvas.height = 24 * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, 24, 24);
      URL.revokeObjectURL(url);
      const mime = format === "webp" ? "image/webp" : "image/png";
      resolve(canvas.toDataURL(mime, 1.0));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("SVG render failed"));
    };
    img.src = url;
  });
};

const IconLibrary: React.FC<IconLibraryProps> = ({
  color = "primary",
  defaultSize = 24,
  downloadable = true,
  defaultFormat = "webp",
  columns = 6,
  showSearch = true,
  showCategories = true,
  showToolbar = true,
  className = "",
  style,
  onIconClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<IconCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [iconSize, setIconSize] = useState(defaultSize);
  const [format, setFormat] = useState<"webp" | "png">(defaultFormat);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const filteredIcons = useMemo(() => {
    let list = activeCategory === "all"
      ? Object.keys(iconDefs)
      : iconCategories.find(c => c.key === activeCategory)?.icons || [];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(name => {
        const def = iconDefs[name];
        if (!def) return false;
        return (
          def.label.includes(q) ||
          def.name.toLowerCase().includes(q) ||
          def.keywords.some(k => k.toLowerCase().includes(q))
        );
      });
    }
    return list;
  }, [activeCategory, searchQuery]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2000);
  }, []);

  const handleDownload = useCallback(async (
    e: React.MouseEvent,
    iconName: string,
    fmt: "webp" | "png",
  ) => {
    e.stopPropagation();
    e.preventDefault();

    // Find the SVG element within the icon container
    const container = (e.currentTarget as HTMLElement).closest(".iconlib-item");
    const svg = container?.querySelector("svg");
    if (!svg) {
      showToast("下载失败：未找到图标元素");
      return;
    }

    // Clone SVG and apply current display style for proper rendering
    const clone = svg.cloneNode(true) as SVGSVGElement;
    const computedStyle = getComputedStyle(svg);
    clone.setAttribute("color", computedStyle.color);
    clone.setAttribute("fill", "none");
    clone.setAttribute("stroke", computedStyle.color);
    clone.setAttribute("stroke-width", "2");

    try {
      const dataUrl = await svgToDataUrl(clone, fmt);
      const link = document.createElement("a");
      link.download = `cyberpunk-${iconName}.${fmt}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`${iconName}.${fmt} 下载成功`);
    } catch {
      showToast("下载失败：格式转换出错");
    }
  }, [showToast]);

  const handleCopyName = useCallback((e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(name).then(
      () => showToast(`已复制: ${name}`),
      () => showToast("复制失败"),
    );
  }, [showToast]);

  const containerClasses = [
    "cyberpunk-iconlib",
    `iconlib-${color}`,
    className,
  ].filter(Boolean).join(" ");

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  return (
    <div className={containerClasses} style={style}>
      {/* Toast */}
      {toastMsg && <div className="iconlib-toast">{toastMsg}</div>}

      {/* Toolbar */}
      {showToolbar && (
        <div className="iconlib-toolbar">
          {showSearch && (
            <div className="iconlib-search">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="iconlib-search-input"
                placeholder="搜索图标..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="iconlib-search-clear" onClick={() => setSearchQuery("")}>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18 M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className="iconlib-toolbar-right">
            <div className="iconlib-size-control">
              <span className="iconlib-label">尺寸</span>
              <input
                type="range"
                min="16"
                max="80"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                className="iconlib-slider"
              />
              <span className="iconlib-size-value">{iconSize}px</span>
            </div>

            {downloadable && (
              <div className="iconlib-format-control">
                <span className="iconlib-label">格式</span>
                <button
                  className={`iconlib-fmt-btn ${format === "webp" ? "iconlib-fmt-active" : ""}`}
                  onClick={() => setFormat("webp")}
                >
                  WebP
                </button>
                <button
                  className={`iconlib-fmt-btn ${format === "png" ? "iconlib-fmt-active" : ""}`}
                  onClick={() => setFormat("png")}
                >
                  PNG
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category tabs */}
      {showCategories && (
        <div className="iconlib-categories">
          <button
            className={`iconlib-cat-btn ${activeCategory === "all" ? "iconlib-cat-active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            全部
            <span className="iconlib-cat-count">{Object.keys(iconDefs).length}</span>
          </button>
          {iconCategories.map((cat) => (
            <button
              key={cat.key}
              className={`iconlib-cat-btn ${activeCategory === cat.key ? "iconlib-cat-active" : ""}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
              <span className="iconlib-cat-count">{cat.icons.length}</span>
            </button>
          ))}
        </div>
      )}

      {/* Icon grid */}
      <div className="iconlib-grid" style={gridStyle}>
        {filteredIcons.map((name) => {
          const def = iconDefs[name];
          if (!def) return null;
          const isHovered = hoveredIcon === name;

          return (
            <div
              key={name}
              className={`iconlib-item ${isHovered ? "iconlib-item-hover" : ""}`}
              onMouseEnter={() => setHoveredIcon(name)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => onIconClick?.(def)}
              title={def.label}
            >
              <div className="iconlib-icon-wrap" style={{ fontSize: iconSize }}>
                {def.svg}
              </div>
              <span className="iconlib-name">{def.label}</span>
              {downloadable && isHovered && (
                <div className="iconlib-actions">
                  <button
                    className="iconlib-action-btn"
                    title={`下载 ${format.toUpperCase()}`}
                    onClick={(e) => handleDownload(e, name, format)}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                  <button
                    className="iconlib-action-btn"
                    title="复制名称"
                    onClick={(e) => handleCopyName(e, name)}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredIcons.length === 0 && (
        <div className="iconlib-empty">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <p>未找到匹配图标</p>
          <p className="iconlib-empty-hint">尝试其他关键词或切换分类</p>
        </div>
      )}

      {/* Footer summary */}
      <div className="iconlib-footer">
        <span>共 {filteredIcons.length} 个图标</span>
        <span>格式: {format.toUpperCase()}</span>
        <span>尺寸: {iconSize}px</span>
      </div>
    </div>
  );
};

export default IconLibrary;
export type { IconDef, IconCategory } from "./icons";
export { iconDefs, iconCategories } from "./icons";

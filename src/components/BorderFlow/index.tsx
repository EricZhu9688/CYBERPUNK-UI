import React, { useRef, useState, useEffect, useMemo } from "react";
import "./style/index.less";

/* ── 渐变色标 ── */
export interface BeamGradientStop {
  color: string;
  percent: number;
}

export type BeamGradient = BeamGradientStop[];

/* ── 预设渐变 ── */
export const beamPresets: Record<string, { name: string; colors: BeamGradient }> = {
  ocean: {
    name: "Ocean",
    colors: [
      { color: "#1677ff", percent: 0 },
      { color: "#36cfc9", percent: 52 },
      { color: "#95de64", percent: 100 },
    ],
  },
  sunset: {
    name: "Sunset",
    colors: [
      { color: "#ff7a45", percent: 0 },
      { color: "#ff4d4f", percent: 49 },
      { color: "#ff85c0", percent: 100 },
    ],
  },
  aurora: {
    name: "Aurora",
    colors: [
      { color: "#7c3aed", percent: 0 },
      { color: "#06b6d4", percent: 57 },
      { color: "#67e8f9", percent: 100 },
    ],
  },
  forest: {
    name: "Forest",
    colors: [
      { color: "#22c55e", percent: 0 },
      { color: "#a3e635", percent: 54 },
      { color: "#facc15", percent: 100 },
    ],
  },
  ember: {
    name: "Ember",
    colors: [
      { color: "#fa541c", percent: 0 },
      { color: "#ff7875", percent: 46 },
      { color: "#ffd666", percent: 100 },
    ],
  },
  nebula: {
    name: "Nebula",
    colors: [
      { color: "#2f54eb", percent: 0 },
      { color: "#722ed1", percent: 44 },
      { color: "#ff85c0", percent: 100 },
    ],
  },
  neon: {
    name: "Neon",
    colors: [
      { color: "#00f3ff", percent: 0 },
      { color: "#ff00ff", percent: 50 },
      { color: "#00f3ff", percent: 100 },
    ],
  },
  matrix: {
    name: "Matrix",
    colors: [
      { color: "#00ff00", percent: 0 },
      { color: "#00cc00", percent: 45 },
      { color: "#80ff80", percent: 100 },
    ],
  },
  synthwave: {
    name: "Synthwave",
    colors: [
      { color: "#ff00ff", percent: 0 },
      { color: "#ff6600", percent: 50 },
      { color: "#00f3ff", percent: 100 },
    ],
  },
};

export interface BorderBeamProps {
  children?: React.ReactNode;
  /** 预设渐变名 或 自定义色标数组 */
  color?: string | BeamGradient;
  /** 光束段占边框周长的比例，0~1 */
  beamSize?: number;
  /** 光束条数 */
  beams?: number;
  /** 动画周期(秒) */
  duration?: number;
  /** 边框宽度(px) */
  borderWidth?: number;
  /** 容器圆角(px) */
  borderRadius?: number;
  /** 内容区背景色 */
  background?: string;
  /** 反转方向 */
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function resolveGradient(color: string | BeamGradient): BeamGradient {
  if (Array.isArray(color)) return color;
  if (beamPresets[color]) return beamPresets[color].colors;
  return beamPresets.neon.colors;
}

let uidCounter = 0;

const BorderBeam: React.FC<BorderBeamProps> = ({
  children,
  color = "neon",
  beamSize = 0.25,
  beams = 1,
  duration = 3,
  borderWidth = 2,
  borderRadius = 4,
  background = "#1a1a2e",
  reverse = false,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({ w: 0, h: 0 });
  const animName = useRef(`bb-kf-${++uidCounter}`);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setRect({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gradient = useMemo(() => resolveGradient(color), [color]);

  const gradientId = useMemo(
    () => `bf-g-${++uidCounter}`,
    [color],
  );

  /* 圆角矩形周长 */
  const perimeter = useMemo(() => {
    const { w, h } = rect;
    if (w === 0 || h === 0) return 0;
    const r = Math.min(borderRadius, w / 2, h / 2);
    const straight = 2 * (w - 2 * r) + 2 * (h - 2 * r);
    const arcs = 2 * Math.PI * r;
    return Math.max(straight + arcs, 0);
  }, [rect, borderRadius]);

  const dashLen = perimeter * beamSize;
  const gapLen = Math.max(1, perimeter - dashLen);

  /* 注入 keyframes */
  const keyframesCss = useMemo(() => {
    if (perimeter === 0) return "";
    const dir = reverse ? "" : "";
    return `@keyframes ${animName.current} { from { stroke-dashoffset: 0; } to { stroke-dashoffset: ${reverse ? "" : "-"}${perimeter}px; } }`;
  }, [perimeter, reverse]);

  const svgStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
    overflow: "visible",
  };

  const classes = ["cyberpunk-borderbeam", className].filter(Boolean).join(" ");

  const rectAnimStyle: React.CSSProperties = {
    animationName: animName.current,
    animationDuration: `${duration}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div
      ref={containerRef}
      className={classes}
      style={{
        borderRadius,
        background,
        ...style,
      } as React.CSSProperties}
    >
      {/* 注入动画关键帧 */}
      {perimeter > 0 && <style>{keyframesCss}</style>}

      {/* SVG 流光层 */}
      {perimeter > 0 && rect.w > 0 && (
        <svg style={svgStyle} viewBox={`0 0 ${rect.w} ${rect.h}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2={rect.w} y2={rect.h}>
              {gradient.map((stop, i) => (
                <stop key={i} offset={`${stop.percent}%`} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          {Array.from({ length: beams }).map((_, i) => {
            const initialOffset = (perimeter / beams) * i;
            return (
              <rect
                key={i}
                x={borderWidth / 2}
                y={borderWidth / 2}
                width={Math.max(0, rect.w - borderWidth)}
                height={Math.max(0, rect.h - borderWidth)}
                rx={Math.max(0, borderRadius - borderWidth / 2)}
                ry={Math.max(0, borderRadius - borderWidth / 2)}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={borderWidth}
                strokeDasharray={`${dashLen} ${gapLen}`}
                strokeDashoffset={initialOffset}
                strokeLinecap="round"
                style={rectAnimStyle as React.CSSProperties}
              />
            );
          })}
        </svg>
      )}

      {/* 内容层 */}
      <div className="bb-inner" style={{ borderRadius: Math.max(0, borderRadius - borderWidth) }}>
        {children}
      </div>
    </div>
  );
};

/* ── 向后兼容别名 ── */
export type BorderFlowProps = BorderBeamProps;
const BorderFlow: React.FC<BorderBeamProps> = (props) => <BorderBeam {...props} />;
export { BorderFlow };
export default BorderBeam;

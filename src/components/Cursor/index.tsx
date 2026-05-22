import React, { useEffect, useRef, useState } from "react";
import "./style/index.less";

export interface CursorProps {
  /** 光标颜色，默认使用主色调 */
  color?: string;
  /** 光标大小（px），默认 20 */
  size?: number;
  /** 是否启用跟随动画，默认 true */
  animated?: boolean;
  /** 动画速度（ms），默认 100 */
  animationSpeed?: number;
  /** 是否显示轨迹，默认 false */
  showTrail?: boolean;
  /** 轨迹长度，默认 10 */
  trailLength?: number;
  /** 自定义类名 */
  className?: string;
  /** 是否启用点击效果，默认 true */
  clickEffect?: boolean;
  /** 自定义点击效果颜色 */
  clickEffectColor?: string;
}

const Cursor: React.FC<CursorProps> = ({
  color,
  size = 20,
  animated = true,
  animationSpeed = 100,
  showTrail = false,
  trailLength = 10,
  className = "",
  clickEffect = true,
  clickEffectColor,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);

  const cursorColor = color || "var(--primary-color, #00f3ff)";
  const effectColor = clickEffectColor || cursorColor;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (showTrail) {
        trailRef.current.push({ x: e.clientX, y: e.clientY });
        if (trailRef.current.length > trailLength) {
          trailRef.current.shift();
        }
      }
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [showTrail, trailLength]);

  useEffect(() => {
    if (cursorRef.current) {
      if (animated) {
        cursorRef.current.style.transition = `transform ${animationSpeed}ms cubic-bezier(0.2, 0.6, 0.3, 1)`;
      } else {
        cursorRef.current.style.transition = "none";
      }
      
      cursorRef.current.style.transform = `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`;
    }
  }, [position, animated, animationSpeed, size]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`cyberpunk-cursor ${className}`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: size,
          height: size,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      >
        {/* 光标主体 */}
        <div
          className="cursor-core"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: cursorColor,
            opacity: 0.7,
            filter: "blur(1px)",
            transform: clicked ? "scale(0.8)" : "scale(1)",
            transition: "transform 0.15s ease",
          }}
        />
        
        {/* 外圈光环 */}
        <div
          className="cursor-halo"
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            borderRadius: "50%",
            border: `1px solid ${cursorColor}`,
            opacity: 0.3,
            animation: "cyberpunk-glow 2s ease-in-out infinite",
          }}
        />
        
        {/* 点击效果 */}
        {clickEffect && clicked && (
          <div
            className="click-effect"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: size * 2,
              height: size * 2,
              borderRadius: "50%",
              border: `2px solid ${effectColor}`,
              transform: "translate(-50%, -50%) scale(0)",
              animation: "click-pulse 0.3s ease-out forwards",
            }}
          />
        )}
      </div>

      {/* 轨迹效果 */}
      {showTrail && trailRef.current.map((pos, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            position: "fixed",
            left: pos.x - size / 4,
            top: pos.y - size / 4,
            width: size / 2,
            height: size / 2,
            borderRadius: "50%",
            backgroundColor: cursorColor,
            opacity: 0.1 + (index / trailLength) * 0.3,
            pointerEvents: "none",
            zIndex: 9998 - index,
          }}
        />
      ))}

      <style>{`
        @keyframes click-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Cursor;
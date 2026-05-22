import React, { useState, useEffect, useRef } from "react";
import "./style/index.less";

export interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  cursorColor?: "primary" | "secondary" | "accent";
  size?: "small" | "medium" | "large";
  loop?: boolean;
  loopDelay?: number;
  onComplete?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 60,
  startDelay = 0,
  cursor = true,
  cursorColor = "primary",
  size = "medium",
  loop = false,
  loopDelay = 2000,
  onComplete,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(cursor);
  const indexRef = useRef(0);
  const isTypingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplayText("");
    indexRef.current = 0;
    isTypingRef.current = false;

    const typeChar = () => {
      if (indexRef.current <= text.length) {
        isTypingRef.current = true;
        setDisplayText(text.slice(0, indexRef.current));
        indexRef.current++;

        if (indexRef.current <= text.length) {
          timerRef.current = setTimeout(typeChar, speed);
        } else {
          isTypingRef.current = false;
          onComplete?.();

          if (loop) {
            timerRef.current = setTimeout(() => {
              indexRef.current = 0;
              setDisplayText("");
              typeChar();
            }, loopDelay);
          }
        }
      }
    };

    const startTimer = setTimeout(typeChar, startDelay);
    return () => {
      clearTimeout(startTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, startDelay, loop, loopDelay]);

  const classes = [
    "cyberpunk-typewriter",
    `typewriter-${size}`,
    cursorColor !== "primary" ? `typewriter-${cursorColor}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className="cyberpunk-typewriter-wrapper">
      <span className={classes}>
        {displayText}
        {cursor && <span className="typewriter-cursor" />}
      </span>
    </span>
  );
};

export default Typewriter;

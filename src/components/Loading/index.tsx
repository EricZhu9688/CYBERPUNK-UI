import React from "react";
import "./style/index.less";

export interface LoadingProps {
  type?: "spinner" | "dots" | "skeleton";
  size?: "small" | "medium" | "large";
  fullscreen?: boolean;
  text?: string;
  skeletonWidth?: number | string;
  skeletonHeight?: number | string;
  className?: string;
}

const sizeMap = { small: "sm", medium: "md", large: "lg" } as const;

const Loading: React.FC<LoadingProps> = ({
  type = "spinner",
  size = "medium",
  fullscreen = false,
  text,
  skeletonWidth = "100%",
  skeletonHeight = 16,
  className = "",
}) => {
  const classes = [
    "cyberpunk-loading",
    fullscreen ? "loading-fullscreen" : "loading-inline",
    type === "dots" ? "loading-dots" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    switch (type) {
      case "dots":
        return (
          <div className="loading-dots-row">
            <span />
            <span />
            <span />
          </div>
        );

      case "skeleton":
        return (
          <div
            className="loading-skeleton"
            style={{ width: skeletonWidth, height: skeletonHeight }}
          />
        );

      case "spinner":
      default:
        return (
          <div className={`loading-spinner spinner-${sizeMap[size]}`}>
            <div className="spinner-ring" />
            <div className="spinner-ring" />
            <div className="spinner-ring" />
            <div className="spinner-core" />
          </div>
        );
    }
  };

  return (
    <div className={classes} role="status" aria-label={text || "Loading"}>
      {renderContent()}
      {text && <div className="loading-text">{text}</div>}
    </div>
  );
};

export default Loading;

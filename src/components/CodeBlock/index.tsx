import React, { useState } from "react";
import "./style/index.less";

export interface CodeBlockProps {
  code?: string;
  language?: string;
  showLineNumbers?: boolean;
  glow?: boolean;
  showHeader?: boolean;
  className?: string;
}

const simpleHighlight = (code: string): string => {
  const lines = code.split("\n");
  return lines
    .map((line) => {
      let highlighted = line
        // 转义 HTML
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // 字符串
        .replace(
          /(["'`])(?:(?!\1|\\).|\\.)*\1/g,
          '<span class="hl-string">$&</span>',
        )
        // 注释
        .replace(
          /(\/\/.*$|\/\*[\s\S]*?\*\/)/g,
          '<span class="hl-comment">$&</span>',
        )
        // 关键字
        .replace(
          /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|new|this|typeof|instanceof|interface|type|enum|async|await|try|catch|throw|default|break|continue|switch|case|void|null|undefined|true|false)\b/g,
          '<span class="hl-keyword">$1</span>',
        )
        // 数字
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>')
        // 函数调用
        .replace(/\b([a-zA-Z_$]\w*)(?=\()/g, '<span class="hl-function">$1</span>')
        // 类型（首字母大写）
        .replace(/\b([A-Z][a-zA-Z]+)\b/g, '<span class="hl-type">$1</span>');
      return `<span class="code-line">${highlighted}</span>`;
    })
    .join("\n");
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code = "",
  language,
  showLineNumbers = false,
  glow = false,
  showHeader = true,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const classes = [
    "cyberpunk-code-block",
    showLineNumbers ? "code-line-numbers" : "",
    glow ? "code-glow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {showHeader && (
        <div className="code-header">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="code-dot" />
            <span className="code-dot" />
            <span className="code-dot" />
            {language && <span className="code-lang">{language}</span>}
          </div>
          <button className="code-copy-btn" onClick={handleCopy} type="button">
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
      )}
      <div className="code-content">
        <pre>
          <code
            dangerouslySetInnerHTML={{ __html: simpleHighlight(code) }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;

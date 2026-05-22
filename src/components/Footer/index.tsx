import React from "react";
import "./style/index.less";

export interface FooterColumn {
  title: string;
  links: { label: string; href?: string }[];
}

export interface FooterProps {
  columns?: FooterColumn[];
  copyright?: string;
  socialLinks?: { label: string; href: string; icon: string }[];
  theme?: "default" | "dark" | "glow";
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  columns = [],
  copyright,
  socialLinks = [],
  theme = "default",
  className = "",
}) => {
  const classes = [
    "cyberpunk-footer",
    theme !== "default" ? `footer-${theme}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={classes}>
      {columns.length > 0 && (
        <div className="footer-content">
          {columns.map((col, i) => (
            <div className="footer-section" key={i}>
              <div className="footer-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map((link, j) => (
                  <li key={j}>
                    {link.href ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {(copyright || socialLinks.length > 0) && (
        <div className="footer-bottom">
          {copyright && <div className="footer-copyright">{copyright}</div>}
          {socialLinks.length > 0 && (
            <div className="footer-socials">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="social-link"
                  title={s.label}
                  dangerouslySetInnerHTML={{ __html: s.icon }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </footer>
  );
};

export default Footer;

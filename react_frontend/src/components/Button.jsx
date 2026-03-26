import React from "react";

/**
 * A lightweight, reusable global Button component for testing and general UI usage.
 *
 * Notes:
 * - This component intentionally avoids external UI libraries.
 * - Styling is done via inline styles to keep this component self-contained for testing.
 * - Consumers can override/extend styles via `style` prop.
 */

// PUBLIC_INTERFACE
function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  ariaLabel,
  title,
  style,
  ...rest
}) {
  /** This is a public component. */

  const isDisabled = disabled || loading;

  const baseStyle = {
    appearance: "none",
    border: "1px solid transparent",
    borderRadius: 10,
    cursor: isDisabled ? "not-allowed" : "pointer",
    fontWeight: 600,
    lineHeight: 1,
    transition: "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease, background-color 120ms ease",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    opacity: isDisabled ? 0.7 : 1,
    transform: "translateY(0)",
    outline: "none",
  };

  const sizeStyleByKey = {
    sm: { padding: "8px 12px", fontSize: 13 },
    md: { padding: "10px 16px", fontSize: 14 },
    lg: { padding: "12px 18px", fontSize: 15 },
  };

  const variantStyleByKey = {
    primary: {
      backgroundColor: "var(--button-bg, #007bff)",
      color: "var(--button-text, #ffffff)",
      borderColor: "rgba(255,255,255,0.12)",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--text-primary, #282c34)",
      borderColor: "var(--border-color, #e9ecef)",
      boxShadow: "none",
    },
    danger: {
      backgroundColor: "#EF4444",
      color: "#ffffff",
      borderColor: "rgba(255,255,255,0.12)",
    },
  };

  const resolvedSizeStyle = sizeStyleByKey[size] ?? sizeStyleByKey.md;
  const resolvedVariantStyle = variantStyleByKey[variant] ?? variantStyleByKey.primary;

  const composedStyle = {
    ...baseStyle,
    ...resolvedSizeStyle,
    ...resolvedVariantStyle,
    ...style,
  };

  const handleClick = (e) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
      style={composedStyle}
      {...rest}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}

export default Button;

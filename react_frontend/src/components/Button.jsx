import React from "react";

/**
 * Small utility to join class names safely.
 * Kept local to avoid adding external dependencies (e.g., clsx) for a single component.
 */
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * @typedef {"primary" | "secondary" | "ghost" | "danger"} ButtonVariant
 * @typedef {"sm" | "md" | "lg"} ButtonSize
 */

/**
 * PUBLIC_INTERFACE
 */
export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  type = "button",
  ...props
}) {
  /** This is a reusable global Button component. */

  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium " +
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed select-none";

  // Theme tokens aligned with style guide:
  // primary: #3b82f6 (blue-500), accents success: #06b6d4 (cyan-500),
  // background: gray-50, surface: white, text: gray-900, secondary: slate.
  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500 ring-offset-white",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400 ring-offset-white",
    ghost:
      "bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400 ring-offset-white",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 ring-offset-white",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  return (
    <button
      type={type}
      className={cx(base, variants[variant], sizes[size], className)}
      disabled={isDisabled}
      aria-disabled={isDisabled ? "true" : undefined}
      {...props}
    >
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}

      <span className={cx("inline-flex items-center", loading ? "opacity-80" : null)}>
        {loading ? (
          <>
            <span
              className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"
              aria-hidden="true"
            />
            <span className="sr-only">Loading</span>
          </>
        ) : null}
        {children}
      </span>

      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}

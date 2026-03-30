import React, { forwardRef, useId } from "react";

/**
 * Small utility to join class names safely.
 * Kept local to avoid adding external dependencies (e.g., clsx) for a single component.
 */
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * @typedef {"default" | "ghost"} InputVariant
 * @typedef {"sm" | "md" | "lg"} InputSize
 */

/**
 * PUBLIC_INTERFACE
 */
const Input = forwardRef(function Input(
  {
    className,
    inputClassName,

    /**
     * Visual + UX props
     */
    label,
    helpText,
    error,
    required = false,

    /**
     * Icons / adornments
     */
    leftIcon = null,
    rightIcon = null,

    /**
     * Styling options
     */
    variant = "default",
    size = "md",

    /**
     * Standard input props
     */
    id,
    name,
    type = "text",
    disabled = false,

    ...props
  },
  ref
) {
  /** This is a reusable global Input component. */

  const autoId = useId();
  const inputId = id || `input-${autoId}`;

  const describedByIds = [];
  const helpId = helpText ? `${inputId}-help` : null;
  const errorId = error ? `${inputId}-error` : null;

  if (helpId) describedByIds.push(helpId);
  if (errorId) describedByIds.push(errorId);

  const isInvalid = Boolean(error);

  const labelStyles = "block text-sm font-medium text-slate-900";
  const helpStyles = "mt-1 text-sm text-slate-600";
  const errorStyles = "mt-1 text-sm text-red-600";

  const wrapperBase = "w-full";

  const inputBase =
    "block w-full rounded-md border bg-white text-slate-900 " +
    "placeholder:text-slate-400 " +
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  // Aligned with Button.jsx tokens:
  // primary accent: blue-500, background: gray-50, surface: white, text: gray-900.
  const variants = {
    default:
      "border-slate-300 focus-visible:ring-blue-500 ring-offset-white hover:border-slate-400",
    ghost:
      "border-transparent bg-slate-50 focus-visible:ring-slate-400 ring-offset-white hover:bg-slate-100",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-3.5 text-sm",
    lg: "h-12 px-4 text-base",
  };

  const invalidStyles =
    "border-red-300 focus-visible:ring-red-500 hover:border-red-400";

  const withLeftIconPadding = leftIcon ? "pl-10" : null;
  const withRightIconPadding = rightIcon ? "pr-10" : null;

  return (
    <div className={cx(wrapperBase, className)}>
      {label ? (
        <label htmlFor={inputId} className={labelStyles}>
          <span>{label}</span>
          {required ? (
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className={cx("relative", label ? "mt-2" : null)}>
        {leftIcon ? (
          <span
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        ) : null}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          disabled={disabled}
          aria-invalid={isInvalid ? "true" : undefined}
          aria-describedby={describedByIds.length ? describedByIds.join(" ") : undefined}
          className={cx(
            inputBase,
            variants[variant],
            sizes[size],
            isInvalid ? invalidStyles : null,
            withLeftIconPadding,
            withRightIconPadding,
            inputClassName
          )}
          {...props}
        />

        {rightIcon ? (
          <span
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        ) : null}
      </div>

      {isInvalid ? (
        <p id={errorId} className={errorStyles}>
          {error}
        </p>
      ) : helpText ? (
        <p id={helpId} className={helpStyles}>
          {helpText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;

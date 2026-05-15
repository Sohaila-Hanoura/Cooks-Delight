import React, { forwardRef, useId } from 'react';
import './Input.css';

/**
 * Input — Cooking & Recipes Blog
 * Matches Figma design: EK0IVka3EakJw5lMCdhpv6
 *
 * Props:
 *   label        {string}                    — field label
 *   required     {boolean}
 *   placeholder  {string}
 *   size         {'sm' | 'md' | 'lg'}        — default 'md'
 *   variant      {'default' | 'search'}
 *   type         {string}                    — HTML input type
 *   multiline    {boolean}                   — renders <textarea>
 *   iconLeft     {ReactNode}
 *   iconRight    {ReactNode}
 *   hint         {string}                    — helper text
 *   error        {string}                    — error message (activates error state)
 *   success      {boolean}
 *   disabled     {boolean}
 *   className    {string}
 *   ...rest      — forwarded to <input> / <textarea>
 */
const Input = forwardRef(function Input(
  {
    label,
    required = false,
    placeholder = '',
    size = 'md',
    variant = 'default',
    type = 'text',
    multiline = false,
    iconLeft,
    iconRight,
    hint,
    error,
    success = false,
    disabled = false,
    className = '',
    id: idProp,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  /* Build class list for the control */
  const controlClasses = [
    'input-control',
    `input-control--${size}`,
    variant === 'search'   && 'input-control--search',
    multiline              && 'input-control--textarea',
    error                  && 'input-control--error',
    success && !error      && 'input-control--success',
    iconLeft               && 'input-control--icon-left',
    iconRight              && 'input-control--icon-right',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hintClasses = [
    'input-hint',
    error   && 'input-hint--error',
    success && !error && 'input-hint--success',
  ]
    .filter(Boolean)
    .join(' ');

  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div className="input-wrapper">
      {label && (
        <label
          htmlFor={id}
          className={`input-label${required ? ' input-label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="input-field">
        {iconLeft && (
          <span className="input-icon input-icon--left" aria-hidden="true">
            {iconLeft}
          </span>
        )}

        <Tag
          ref={ref}
          id={id}
          type={multiline ? undefined : type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={controlClasses}
          aria-invalid={!!error}
          aria-describedby={hint || error ? `${id}-hint` : undefined}
          {...rest}
        />

        {iconRight && (
          <span className="input-icon input-icon--right" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>

      {(hint || error) && (
        <span id={`${id}-hint`} className={hintClasses} role={error ? 'alert' : undefined}>
          {error || hint}
        </span>
      )}
    </div>
  );
});

export default Input;

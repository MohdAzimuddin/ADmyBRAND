"use client";
import React, { forwardRef, useState, useId } from 'react';
import { cn } from '@/lib/utils';

// ===== TYPE DEFINITIONS =====
export type InputVariant = 'text' | 'email' | 'password' | 'textarea' | 'tel' | 'url' | 'search';
export type InputState = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

// Base Input Props
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  state?: InputState;
  size?: InputSize;
  label?: string;
  floatingLabel?: boolean;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  loading?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  showPasswordToggle?: boolean;
}

// Textarea specific props
export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  variant: 'textarea';
  state?: InputState;
  size?: InputSize;
  label?: string;
  floatingLabel?: boolean;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  required?: boolean;
  fullWidth?: boolean;
  rows?: number;
  resize?: boolean;
}

// Combined props type
export type CombinedInputProps = InputProps | TextareaProps;

// ===== STYLE CONFIGURATIONS =====

// Size variants
const sizeVariants: Record<InputSize, {
  input: string;
  label: string;
  icon: string;
  helperText: string;
}> = {
  sm: {
    input: 'h-9 px-3 py-2 text-sm',
    label: 'text-xs',
    icon: 'w-4 h-4',
    helperText: 'text-xs mt-1',
  },
  md: {
    input: 'h-11 px-4 py-3 text-sm',
    label: 'text-sm',
    icon: 'w-5 h-5',
    helperText: 'text-sm mt-1.5',
  },
  lg: {
    input: 'h-13 px-5 py-4 text-base',
    label: 'text-base',
    icon: 'w-6 h-6',
    helperText: 'text-sm mt-2',
  },
};

// State variants
const stateVariants: Record<InputState, {
  border: string;
  focus: string;
  background: string;
  text: string;
}> = {
  default: {
    border: 'border-slate-300 dark:border-slate-600',
    focus: 'focus:border-blue-500 focus:ring-blue-500/20',
    background: 'bg-white dark:bg-slate-900',
    text: 'text-slate-900 dark:text-slate-100',
  },
  error: {
    border: 'border-red-300 dark:border-red-500',
    focus: 'focus:border-red-500 focus:ring-red-500/20',
    background: 'bg-red-50/50 dark:bg-red-950/20',
    text: 'text-slate-900 dark:text-slate-100',
  },
  success: {
    border: 'border-green-300 dark:border-green-500',
    focus: 'focus:border-green-500 focus:ring-green-500/20',
    background: 'bg-green-50/50 dark:bg-green-950/20',
    text: 'text-slate-900 dark:text-slate-100',
  },
};

// ===== HELPER COMPONENTS =====

// Loading Spinner
const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('animate-spin text-slate-400', className)}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Eye Icon for password toggle
const EyeIcon: React.FC<{ open: boolean; className?: string }> = ({ open, className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {open ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
      />
    )}
  </svg>
);

// Success Icon
const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

// Error Icon
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

// ===== MAIN INPUT COMPONENT =====
export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedInputProps>(
  (props, ref) => {
    const {
      variant = 'text',
      state = 'default',
      size = 'md',
      label,
      floatingLabel = true,
      helperText,
      errorMessage,
      successMessage,
      prefixIcon,
      suffixIcon,
      loading = false,
      required = false,
      fullWidth = true,
      disabled = false,
      className,
      id: providedId,
      placeholder,
      value,
      defaultValue,
      ...restProps
    } = props;

    // State management
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const id = providedId || generatedId;

    // Determine if input has value
    const hasValue = Boolean(
      value ||
      defaultValue ||
      (restProps as any).defaultValue ||
      (!floatingLabel && placeholder)
    );

    // Determine actual state based on props
    const actualState = errorMessage ? 'error' : successMessage ? 'success' : state;

    // Show password toggle for password inputs
    const shouldShowPasswordToggle = 
      variant === 'password' && 
      (props as InputProps).showPasswordToggle !== false;

    // Calculate input type
    const inputType = variant === 'password' 
      ? (showPassword ? 'text' : 'password')
      : variant === 'textarea' 
        ? undefined 
        : variant;

    // Generate ARIA attributes
    const ariaProps = {
      'aria-invalid': actualState === 'error',
      'aria-describedby': cn(
        helperText && `${id}-helper`,
        errorMessage && `${id}-error`,
        successMessage && `${id}-success`
      ) || undefined,
      'aria-required': required,
    };

    // Base input classes
    const inputClasses = cn(
      // Base styles
      'w-full rounded-xl border transition-all duration-200',
      'placeholder-slate-400 dark:placeholder-slate-500',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'disabled:bg-slate-100 dark:disabled:bg-slate-800',
      
      // Size variant
      sizeVariants[size].input,
      
      // State variant
      stateVariants[actualState].border,
      stateVariants[actualState].focus,
      stateVariants[actualState].background,
      stateVariants[actualState].text,
      
      // Icon spacing
      prefixIcon && (size === 'sm' ? 'pl-10' : size === 'lg' ? 'pl-14' : 'pl-12'),
      (suffixIcon || loading || shouldShowPasswordToggle || actualState !== 'default') && 
        (size === 'sm' ? 'pr-10' : size === 'lg' ? 'pr-14' : 'pr-12'),
      
      // Floating label adjustments
      floatingLabel && 'placeholder-transparent',
      
      // Full width
      fullWidth && 'w-full',
      
      // Textarea specific
      variant === 'textarea' && [
        'resize-none min-h-[100px]',
        (restProps as TextareaProps).resize && 'resize-vertical',
      ],
    );

    // Label classes
    const labelClasses = cn(
      'absolute left-4 transition-all duration-200 pointer-events-none',
      sizeVariants[size].label,
      
      // Floating label positioning
      floatingLabel && [
        (isFocused || hasValue) && [
          'transform -translate-y-2 scale-90',
          size === 'sm' ? 'top-1' : size === 'lg' ? 'top-2' : 'top-1.5',
          'bg-white dark:bg-slate-900 px-2 rounded',
        ],
        !(isFocused || hasValue) && [
          size === 'sm' ? 'top-2' : size === 'lg' ? 'top-4' : 'top-3',
        ],
      ],
      
      // Non-floating label
      !floatingLabel && [
        'relative transform-none scale-100 mb-2 block',
        'text-slate-700 dark:text-slate-300 font-medium',
      ],
      
      // State colors
      actualState === 'error' ? 'text-red-600 dark:text-red-400' :
      actualState === 'success' ? 'text-green-600 dark:text-green-400' :
      'text-slate-600 dark:text-slate-400',
      
      // Focus color
      isFocused && actualState === 'default' && 'text-blue-600 dark:text-blue-400',
    );

    // Container classes
    const containerClasses = cn(
      'relative',
      fullWidth && 'w-full',
      className
    );

    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (variant === 'textarea') {
        (restProps as TextareaProps).onFocus?.(e as React.FocusEvent<HTMLTextAreaElement>);
      } else {
        (restProps as InputProps).onFocus?.(e as React.FocusEvent<HTMLInputElement>);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      if (variant === 'textarea') {
        (restProps as TextareaProps).onBlur?.(e as React.FocusEvent<HTMLTextAreaElement>);
      } else {
        (restProps as InputProps).onBlur?.(e as React.FocusEvent<HTMLInputElement>);
      }
    };

    return (
      <div className={containerClasses}>
        {/* Non-floating label */}
        {label && !floatingLabel && (
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Prefix Icon */}
          {prefixIcon && (
            <div className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-slate-400',
              sizeVariants[size].icon
            )}>
              {prefixIcon}
            </div>
          )}

          {/* Input/Textarea */}
          {variant === 'textarea' ? (
            <textarea
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
              id={id}
              disabled={disabled}
              className={inputClasses}
              placeholder={floatingLabel ? ' ' : placeholder}
              value={value}
              defaultValue={defaultValue}
              rows={(restProps as TextareaProps).rows || 4}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...ariaProps}
              {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.ForwardedRef<HTMLInputElement>}
              type={inputType}
              id={id}
              disabled={disabled}
              className={inputClasses}
              placeholder={floatingLabel ? ' ' : placeholder}
              value={value}
              defaultValue={defaultValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...ariaProps}
              {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {/* Floating Label */}
          {label && floatingLabel && (
            <label htmlFor={id} className={labelClasses}>
              {label}
              {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
            </label>
          )}

          {/* Suffix Icons */}
          <div className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2',
            sizeVariants[size].icon
          )}>
            {/* Loading Spinner */}
            {loading && <LoadingSpinner className={sizeVariants[size].icon} />}
            
            {/* State Icons */}
            {!loading && actualState === 'success' && (
              <SuccessIcon className={cn(sizeVariants[size].icon, 'text-green-500')} />
            )}
            {!loading && actualState === 'error' && (
              <ErrorIcon className={cn(sizeVariants[size].icon, 'text-red-500')} />
            )}
            
            {/* Password Toggle */}
            {!loading && shouldShowPasswordToggle && (
              <button
                type="button"
                className={cn(
                  'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
                  'focus:outline-none focus:text-blue-600 dark:focus:text-blue-400',
                  'transition-colors duration-200'
                )}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} className={sizeVariants[size].icon} />
              </button>
            )}
            
            {/* Custom Suffix Icon */}
            {!loading && suffixIcon && actualState === 'default' && !shouldShowPasswordToggle && (
              <div className="text-slate-400">
                {suffixIcon}
              </div>
            )}
          </div>
        </div>

        {/* Helper Text / Error Message / Success Message */}
        {(helperText || errorMessage || successMessage) && (
          <div className={cn(sizeVariants[size].helperText, 'space-y-1')}>
            {errorMessage && (
              <p
                id={`${id}-error`}
                className="text-red-600 dark:text-red-400 flex items-center space-x-1"
                role="alert"
                aria-live="polite"
              >
                <ErrorIcon className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}
            {!errorMessage && successMessage && (
              <p
                id={`${id}-success`}
                className="text-green-600 dark:text-green-400 flex items-center space-x-1"
                aria-live="polite"
              >
                <SuccessIcon className="w-4 h-4 flex-shrink-0" />
                <span>{successMessage}</span>
              </p>
            )}
            {!errorMessage && !successMessage && helperText && (
              <p
                id={`${id}-helper`}
                className="text-slate-500 dark:text-slate-400"
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
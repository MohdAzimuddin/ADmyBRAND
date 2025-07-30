import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Loading Spinner Component
const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <svg
      className={cn(
        'animate-spin text-current',
        sizeClasses[size]
      )}
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
};

// Button Props Interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
}

// Button Variant Styles
const buttonVariants = {
  primary: [
    // Base styles with glassmorphism
    'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600',
    'text-white font-semibold',
    'border border-white/20',
    'shadow-lg shadow-blue-500/25',
    'backdrop-blur-sm',
    // Hover effects
    'hover:from-blue-600 hover:via-purple-600 hover:to-blue-700',
    'hover:shadow-xl hover:shadow-blue-500/30',
    'hover:border-white/30',
    'hover:-translate-y-0.5',
    // Focus effects
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2',
    'focus:ring-offset-transparent',
    // Active state
    'active:translate-y-0 active:shadow-md',
    // Transitions
    'transition-all duration-300 ease-out',
  ],
  secondary: [
    'bg-gradient-to-r from-slate-100 to-slate-200',
    'dark:from-slate-800 dark:to-slate-700',
    'text-slate-900 dark:text-slate-100 font-semibold',
    'border border-slate-300/50 dark:border-slate-600/50',
    'shadow-md shadow-slate-900/10',
    'backdrop-blur-sm',
    'hover:from-slate-200 hover:to-slate-300',
    'dark:hover:from-slate-700 dark:hover:to-slate-600',
    'hover:shadow-lg hover:shadow-slate-900/15',
    'hover:border-slate-400/50 dark:hover:border-slate-500/50',
    'hover:-translate-y-0.5',
    'focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2',
    'focus:ring-offset-transparent',
    'active:translate-y-0 active:shadow-sm',
    'transition-all duration-300 ease-out',
  ],
  outline: [
    'bg-transparent backdrop-blur-sm',
    'text-blue-600 dark:text-blue-400 font-semibold',
    'border-2 border-blue-500/50',
    'shadow-sm',
    'hover:bg-blue-50/80 dark:hover:bg-blue-950/50',
    'hover:border-blue-600/70',
    'hover:text-blue-700 dark:hover:text-blue-300',
    'hover:shadow-md hover:shadow-blue-500/20',
    'hover:-translate-y-0.5',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2',
    'focus:ring-offset-transparent',
    'active:translate-y-0 active:bg-blue-100/60 dark:active:bg-blue-900/40',
    'transition-all duration-300 ease-out',
  ],
  ghost: [
    'bg-transparent',
    'text-slate-700 dark:text-slate-300 font-medium',
    'border border-transparent',
    'hover:bg-slate-100/80 dark:hover:bg-slate-800/50',
    'hover:text-slate-900 dark:hover:text-slate-100',
    'hover:backdrop-blur-sm',
    'hover:shadow-sm',
    'hover:-translate-y-0.5',
    'focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:ring-offset-1',
    'focus:ring-offset-transparent',
    'active:translate-y-0 active:bg-slate-200/60 dark:active:bg-slate-700/40',
    'transition-all duration-300 ease-out',
  ],
  destructive: [
    'bg-gradient-to-r from-red-500 to-red-600',
    'text-white font-semibold',
    'border border-red-400/30',
    'shadow-lg shadow-red-500/25',
    'backdrop-blur-sm',
    'hover:from-red-600 hover:to-red-700',
    'hover:shadow-xl hover:shadow-red-500/30',
    'hover:border-red-300/40',
    'hover:-translate-y-0.5',
    'focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2',
    'focus:ring-offset-transparent',
    'active:translate-y-0 active:shadow-md',
    'transition-all duration-300 ease-out',
  ],
};

// Button Size Styles
const buttonSizes = {
  sm: [
    'h-8 px-3 py-1',
    'text-xs',
    'rounded-lg',
    'gap-1.5',
  ],
  md: [
    'h-10 px-4 py-2',
    'text-sm',
    'rounded-xl',
    'gap-2',
  ],
  lg: [
    'h-12 px-6 py-3',
    'text-base',
    'rounded-xl',
    'gap-2.5',
  ],
  xl: [
    'h-14 px-8 py-4',
    'text-lg',
    'rounded-2xl',
    'gap-3',
  ],
};

// Disabled State Styles
const disabledStyles = [
  'opacity-50',
  'cursor-not-allowed',
  'pointer-events-none',
  'transform-none',
  'shadow-none',
];

// Loading State Styles
const loadingStyles = [
  'cursor-wait',
  'pointer-events-none',
];

// Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    
    // Determine spinner size based on button size
    const spinnerSize = size === 'sm' ? 'sm' : size === 'xl' ? 'lg' : 'md';
    
    // Generate accessible label
    const accessibleLabel = ariaLabel || (typeof children === 'string' ? children : undefined);
    
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-label={loading ? `Loading... ${accessibleLabel || ''}`.trim() : accessibleLabel}
        aria-busy={loading}
        className={cn(
          // Base button styles
          'relative inline-flex items-center justify-center',
          'font-medium text-center',
          'cursor-pointer select-none',
          'focus-visible:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Variant styles
          buttonVariants[variant],
          
          // Size styles
          buttonSizes[size],
          
          // Full width
          fullWidth && 'w-full',
          
          // State-specific styles
          isDisabled && disabledStyles,
          loading && loadingStyles,
          
          // Custom className
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size={spinnerSize} />
          </div>
        )}
        
        {/* Button Content */}
        <div
          className={cn(
            'flex items-center justify-center',
            loading && 'opacity-0'
          )}
        >
          {/* Left Icon */}
          {leftIcon && !loading && (
            <span className="inline-flex items-center justify-center flex-shrink-0">
              {leftIcon}
            </span>
          )}
          
          {/* Button Text */}
          <span className="inline-flex items-center">
            {children}
          </span>
          
          {/* Right Icon */}
          {rightIcon && !loading && (
            <span className="inline-flex items-center justify-center flex-shrink-0">
              {rightIcon}
            </span>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
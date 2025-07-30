import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// TypeScript interfaces
export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'spin' | 'pulse' | 'dots' | 'bars';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'muted';
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  isCentered?: boolean;
  isInline?: boolean;
}

// Size configurations
const sizeVariants = {
  xs: {
    container: 'h-4 w-4',
    text: 'text-xs',
    dot: 'h-1 w-1',
    bar: 'h-2 w-1',
  },
  sm: {
    container: 'h-5 w-5',
    text: 'text-sm',
    dot: 'h-1.5 w-1.5',
    bar: 'h-3 w-1.5',
  },
  md: {
    container: 'h-6 w-6',
    text: 'text-base',
    dot: 'h-2 w-2',
    bar: 'h-4 w-2',
  },
  lg: {
    container: 'h-8 w-8',
    text: 'text-lg',
    dot: 'h-2.5 w-2.5',
    bar: 'h-5 w-2.5',
  },
  xl: {
    container: 'h-10 w-10',
    text: 'text-xl',
    dot: 'h-3 w-3',
    bar: 'h-6 w-3',
  },
};

// Color variants matching brand palette from globals.css
const colorVariants = {
  primary: 'text-blue-500 dark:text-blue-400',
  secondary: 'text-purple-500 dark:text-purple-400',
  accent: 'text-pink-500 dark:text-pink-400',
  success: 'text-emerald-500 dark:text-emerald-400',
  warning: 'text-amber-500 dark:text-amber-400',
  error: 'text-red-500 dark:text-red-400',
  muted: 'text-gray-400 dark:text-gray-500',
};

// Animation keyframes (defined in globals.css)
// These will use the animations we defined in your globals.css file

export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      variant = 'spin',
      size = 'md',
      color = 'primary',
      label,
      labelPosition = 'bottom',
      isCentered = false,
      isInline = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeVariants[size];
    const colorClass = colorVariants[color];

    // Spinner variants
    const renderSpinner = () => {
      switch (variant) {
        case 'spin':
          return (
            <svg
              className={cn(
                'animate-spin',
                sizeConfig.container,
                colorClass
              )}
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          );
        case 'pulse':
          return (
            <div
              className={cn(
                'rounded-full animate-pulse-slow',
                sizeConfig.container,
                colorClass
              )}
            />
          );
        case 'dots':
          return (
            <div className={cn('flex items-center justify-center gap-1', sizeConfig.container)}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full animate-bounce-slow',
                    sizeConfig.dot,
                    colorClass,
                    i === 0 && 'animation-delay-[-0.32s]',
                    i === 1 && 'animation-delay-[-0.16s]'
                  )}
                />
              ))}
            </div>
          );
        case 'bars':
          return (
            <div className={cn('flex items-end justify-center gap-1', sizeConfig.container)}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'animate-grow-slow',
                    sizeConfig.bar,
                    colorClass,
                    i === 0 && 'animation-delay-[-0.4s]',
                    i === 1 && 'animation-delay-[-0.3s]',
                    i === 2 && 'animation-delay-[-0.2s]',
                    i === 3 && 'animation-delay-[-0.1s]',
                    'origin-bottom'
                  )}
                />
              ))}
            </div>
          );
        default:
          return null;
      }
    };

    // Label position classes
    const labelPositionClasses = {
      top: 'flex-col-reverse',
      bottom: 'flex-col',
      left: 'flex-row-reverse',
      right: 'flex-row',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'flex items-center justify-center',
          // Centered or inline
          isCentered && !isInline ? 'fixed inset-0 z-50' : '',
          isInline ? 'inline-flex' : '',
          // Label positioning
          label && labelPositionClasses[labelPosition],
          // Gap between spinner and label
          label && 'gap-2',
          className
        )}
        role="status"
        aria-live="polite"
        aria-busy="true"
        {...props}
      >
        {renderSpinner()}
        {label && (
          <span
            className={cn(
              'text-gray-600 dark:text-gray-400',
              sizeConfig.text,
              // Center text when label is top/bottom
              ['top', 'bottom'].includes(labelPosition) ? 'text-center' : ''
            )}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

// Utility component for full-page loading
export const FullPageLoader: React.FC<Omit<LoadingSpinnerProps, 'isCentered' | 'isInline'>> = (props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <LoadingSpinner isCentered {...props} />
  </div>
);

export default LoadingSpinner;
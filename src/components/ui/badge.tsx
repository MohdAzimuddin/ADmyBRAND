import React, { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// TypeScript interfaces
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill';
  pulse?: boolean;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

// Variant styles with modern color schemes for light/dark modes
const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
  warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
  error: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  info: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
};

// Size styles
const badgeSizes = {
  sm: 'px-2 py-1 text-xs font-medium gap-1',
  md: 'px-2.5 py-1.5 text-sm font-medium gap-1.5',
  lg: 'px-3 py-2 text-sm font-semibold gap-2',
};

// Shape styles
const badgeShapes = {
  rounded: 'rounded-md',
  pill: 'rounded-full',
};

// Close button sizes
const closeButtonSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-4 w-4',
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      shape = 'rounded',
      pulse = false,
      closable = false,
      onClose,
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center border transition-all duration-200 ease-in-out',
          // Variant styles
          badgeVariants[variant],
          // Size styles
          badgeSizes[size],
          // Shape styles
          badgeShapes[shape],
          // Pulse animation
          pulse && 'animate-pulse',
          // Hover effects
          'hover:shadow-sm hover:scale-105',
          // Focus styles for accessibility
          'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400',
          className
        )}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span className={cn(
            'flex-shrink-0',
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          )}>
            {icon}
          </span>
        )}

        {/* Content */}
        <span className="truncate">
          {children}
        </span>

        {/* Close button */}
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              'flex-shrink-0 ml-1 rounded-full p-0.5 transition-colors duration-200',
              'hover:bg-black/10 dark:hover:bg-white/10',
              'focus:outline-none focus:ring-1 focus:ring-current',
              closeButtonSizes[size]
            )}
            aria-label="Remove badge"
          >
            <X className="h-full w-full" />
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// Export additional utility components for common use cases
export const StatusBadge: React.FC<{
  status: 'online' | 'offline' | 'away' | 'busy';
  children: React.ReactNode;
  size?: BadgeProps['size'];
}> = ({ status, children, size = 'md' }) => {
  const statusVariants = {
    online: 'success' as const,
    offline: 'default' as const,
    away: 'warning' as const,
    busy: 'error' as const,
  };

  const statusIcons = {
    online: <div className="w-2 h-2 bg-emerald-500 rounded-full" />,
    offline: <div className="w-2 h-2 bg-gray-400 rounded-full" />,
    away: <div className="w-2 h-2 bg-amber-500 rounded-full" />,
    busy: <div className="w-2 h-2 bg-red-500 rounded-full" />,
  };

  return (
    <Badge
      variant={statusVariants[status]}
      size={size}
      icon={statusIcons[status]}
      shape="pill"
    >
      {children}
    </Badge>
  );
};

export const NotificationBadge: React.FC<{
  count: number;
  max?: number;
  pulse?: boolean;
  size?: BadgeProps['size'];
}> = ({ count, max = 99, pulse = false, size = 'sm' }) => {
  const displayCount = count > max ? `${max}+` : count.toString();
  
  return (
    <Badge
      variant="error"
      size={size}
      shape="pill"
      pulse={pulse}
      className="min-w-[1.5rem] justify-center"
    >
      {displayCount}
    </Badge>
  );
};

export default Badge;
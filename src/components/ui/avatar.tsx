import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

// TypeScript interfaces
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circular' | 'rounded';
  showOnlineStatus?: boolean;
  isOnline?: boolean;
  fallbackBg?: string;
  className?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

// Size configurations for different elements
const avatarSizes = {
  xs: {
    wrapper: 'h-6 w-6',
    text: 'text-xs',
    icon: 'h-3 w-3',
    status: 'h-1.5 w-1.5 border',
    statusPosition: '-bottom-0 -right-0',
  },
  sm: {
    wrapper: 'h-8 w-8',
    text: 'text-sm',
    icon: 'h-4 w-4',
    status: 'h-2 w-2 border',
    statusPosition: '-bottom-0 -right-0',
  },
  md: {
    wrapper: 'h-10 w-10',
    text: 'text-base',
    icon: 'h-5 w-5',
    status: 'h-2.5 w-2.5 border-2',
    statusPosition: '-bottom-0.5 -right-0.5',
  },
  lg: {
    wrapper: 'h-12 w-12',
    text: 'text-lg',
    icon: 'h-6 w-6',
    status: 'h-3 w-3 border-2',
    statusPosition: '-bottom-0.5 -right-0.5',
  },
  xl: {
    wrapper: 'h-16 w-16',
    text: 'text-xl',
    icon: 'h-8 w-8',
    status: 'h-4 w-4 border-2',
    statusPosition: '-bottom-1 -right-1',
  },
};

// Variant styles
const avatarVariants = {
  circular: 'rounded-full',
  rounded: 'rounded-lg',
};

// Fallback background colors (accessible and modern)
const fallbackBackgrounds = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500',
];

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      initials,
      size = 'md',
      variant = 'circular',
      showOnlineStatus = false,
      isOnline = false,
      fallbackBg,
      className,
      imgProps,
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const sizeConfig = avatarSizes[size];

    // Handle image load success
    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
      setImageError(false);
    }, []);

    // Handle image load error
    const handleImageError = useCallback(() => {
      setImageLoaded(false);
      setImageError(true);
    }, []);

    // Generate initials from name
    const generatedInitials = useMemo(() => {
      if (initials) return initials.toUpperCase().slice(0, 2);
      if (name) {
        return name
          .split(' ')
          .map(part => part.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2);
      }
      return '';
    }, [name, initials]);

    // Generate consistent background color based on name
    const backgroundColor = useMemo(() => {
      if (fallbackBg) return fallbackBg;
      if (name) {
        const hash = name.split('').reduce((acc, char) => {
          return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        return fallbackBackgrounds[Math.abs(hash) % fallbackBackgrounds.length];
      }
      return 'bg-gray-500';
    }, [name, fallbackBg]);

    // Determine what to show
    const showImage = src && imageLoaded && !imageError;
    const showInitials = !showImage && generatedInitials;
    const showIcon = !showImage && !showInitials;

    // Generate alt text
    const imageAlt = alt || (name ? `${name}'s avatar` : 'User avatar');

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden',
          'transition-all duration-200 ease-in-out',
          // Size
          sizeConfig.wrapper,
          // Variant
          avatarVariants[variant],
          // Background for fallback states
          !showImage && backgroundColor,
          // Hover effect
          'hover:scale-105 hover:shadow-md',
          // Focus styles for accessibility
          'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400',
          className
        )}
        {...props}
      >
        {/* Image */}
        {src && (
          <img
            src={src}
            alt={imageAlt}
            className={cn(
              'h-full w-full object-cover transition-opacity duration-200',
              showImage ? 'opacity-100' : 'opacity-0',
              // Ensure crisp rendering
              'image-rendering-auto'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            {...imgProps}
          />
        )}

        {/* Initials fallback */}
        {showInitials && (
          <span
            className={cn(
              'font-semibold text-white select-none',
              sizeConfig.text
            )}
            aria-label={`${name || 'User'} initials`}
          >
            {generatedInitials}
          </span>
        )}

        {/* Icon fallback */}
        {showIcon && (
          <User
            className={cn(
              'text-white',
              sizeConfig.icon
            )}
            aria-label="Default user avatar"
          />
        )}

        {/* Online status indicator */}
        {showOnlineStatus && (
          <div
            className={cn(
              'absolute rounded-full',
              sizeConfig.status,
              sizeConfig.statusPosition,
              isOnline
                ? 'bg-emerald-500 ring-white dark:ring-gray-900'
                : 'bg-gray-400 ring-white dark:ring-gray-900',
              // Add a subtle pulse animation for online status
              isOnline && 'animate-pulse'
            )}
            aria-label={isOnline ? 'Online' : 'Offline'}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group component for showing multiple avatars with overlap
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps['size'];
  spacing?: 'tight' | 'normal' | 'loose';
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 5, size = 'md', spacing = 'normal', className, ...props }, ref) => {
    const spacingClasses = {
      tight: '-space-x-1',
      normal: '-space-x-2',
      loose: '-space-x-1',
    };

    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = Math.max(0, childrenArray.length - max);

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className="ring-2 ring-white dark:ring-gray-900 rounded-full"
            style={{ zIndex: visibleChildren.length - index }}
          >
            {React.cloneElement(child as React.ReactElement, {
              size,
              className: cn('hover:z-50 relative', (child as React.ReactElement).props?.className),
            })}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div
            className={cn(
              'ring-2 ring-white dark:ring-gray-900 rounded-full relative',
              'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
              'flex items-center justify-center font-medium',
              avatarSizes[size].wrapper,
              avatarVariants.circular
            )}
            style={{ zIndex: 0 }}
          >
            <span className={avatarSizes[size].text}>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

// Testimonial Avatar - specialized component for testimonials
export interface TestimonialAvatarProps extends Omit<AvatarProps, 'showOnlineStatus' | 'isOnline'> {
  author: string;
  role?: string;
  company?: string;
}

export const TestimonialAvatar: React.FC<TestimonialAvatarProps> = ({
  author,
  role,
  company,
  ...avatarProps
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar
        name={author}
        alt={`${author}'s profile picture`}
        size="md"
        {...avatarProps}
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {author}
        </p>
        {(role || company) && (
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {role && company ? `${role} at ${company}` : role || company}
          </p>
        )}
      </div>
    </div>
  );
};

export default Avatar;
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ===== TYPE DEFINITIONS =====
export type CardPaddingVariant = 'sm' | 'md' | 'lg';
export type CardShadowVariant = 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type CardRadiusVariant = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Base Card Props
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPaddingVariant;
  shadow?: CardShadowVariant;
  radius?: CardRadiusVariant;
  glass?: boolean;
  hover?: boolean;
  border?: boolean;
  children: React.ReactNode;
}

// Card Header Props
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPaddingVariant;
  border?: boolean;
  children: React.ReactNode;
}

// Card Content Props
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPaddingVariant;
  children: React.ReactNode;
}

// Card Footer Props
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPaddingVariant;
  border?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  children: React.ReactNode;
}

// ===== STYLE CONFIGURATIONS =====

// Padding variants following 8px grid system
const paddingVariants: Record<CardPaddingVariant, string> = {
  sm: 'p-4',    // 16px
  md: 'p-6',    // 24px
  lg: 'p-8',    // 32px
};

// Header/Footer specific padding (typically less vertical padding)
const headerFooterPadding: Record<CardPaddingVariant, string> = {
  sm: 'px-4 py-3',  // 16px horizontal, 12px vertical
  md: 'px-6 py-4',  // 24px horizontal, 16px vertical
  lg: 'px-8 py-5',  // 32px horizontal, 20px vertical
};

// Shadow variants
const shadowVariants: Record<CardShadowVariant, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

// Border radius variants
const radiusVariants: Record<CardRadiusVariant, string> = {
  sm: 'rounded-lg',      // 8px
  md: 'rounded-xl',      // 12px
  lg: 'rounded-2xl',     // 16px
  xl: 'rounded-3xl',     // 24px
  '2xl': 'rounded-[2rem]', // 32px
};

// Footer justify variants
const justifyVariants = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

// ===== MAIN CARD COMPONENT =====
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = 'md',
      shadow = 'md',
      radius = 'lg',
      glass = true,
      hover = true,
      border = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base card styles
          'relative overflow-hidden',
          'transition-all duration-300 ease-out',
          
          // Glassmorphism effect
          glass && [
            'bg-white/70 dark:bg-slate-900/70',
            'backdrop-blur-xl',
            'border-white/20 dark:border-slate-700/30',
          ],
          
          // Non-glass fallback
          !glass && [
            'bg-white dark:bg-slate-900',
            'border-slate-200 dark:border-slate-700',
          ],
          
          // Border
          border && 'border',
          
          // Padding, shadow, radius
          paddingVariants[padding],
          shadowVariants[shadow],
          radiusVariants[radius],
          
          // Hover effects
          hover && [
            'hover:shadow-xl',
            'hover:-translate-y-1',
            'hover:shadow-slate-900/10 dark:hover:shadow-black/20',
            glass && 'hover:bg-white/80 dark:hover:bg-slate-900/80',
            glass && 'hover:border-white/30 dark:hover:border-slate-600/40',
          ],
          
          // Focus styles for accessibility
          'focus-within:ring-2 focus-within:ring-blue-500/20',
          'focus-within:ring-offset-2 focus-within:ring-offset-transparent',
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ===== CARD HEADER COMPONENT =====
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      padding = 'md',
      border = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base header styles
          'flex flex-col space-y-1.5',
          
          // Padding
          headerFooterPadding[padding],
          
          // Border
          border && [
            'border-b border-slate-200/60 dark:border-slate-700/60',
            'mb-2',
          ],
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ===== CARD CONTENT COMPONENT =====
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base content styles
          'flex-1',
          
          // Padding
          paddingVariants[padding],
          
          // Reset margin if used with header/footer
          '-mx-2 first:mt-0 last:mb-0',
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// ===== CARD FOOTER COMPONENT =====
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      padding = 'md',
      border = false,
      justify = 'end',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base footer styles
          'flex items-center',
          justifyVariants[justify],
          
          // Padding
          headerFooterPadding[padding],
          
          // Border
          border && [
            'border-t border-slate-200/60 dark:border-slate-700/60',
            'mt-2',
          ],
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ===== CARD TITLE COMPONENT =====
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  (
    {
      as: Component = 'h3',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight',
          'text-slate-900 dark:text-slate-100',
          'mb-0', // Reset default margin
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ===== CARD DESCRIPTION COMPONENT =====
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-sm text-slate-600 dark:text-slate-400',
          'leading-relaxed',
          'mb-0', // Reset default margin
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

// ===== PRESET CARD COMPONENTS =====

// Pricing Card Preset
export interface PricingCardProps extends Omit<CardProps, 'children'> {
  title: string;
  price: string;
  description?: string;
  features: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  popular?: boolean;
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      title,
      price,
      description,
      features,
      buttonText = 'Get Started',
      onButtonClick,
      popular = false,
      ...cardProps
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          popular && [
            'ring-2 ring-blue-500/50',
            'relative',
            'scale-105',
          ]
        )}
        {...cardProps}
      >
        {popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>
        )}
        
        <CardHeader padding="lg" border>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
          <div className="mt-4">
            <span className="text-3xl font-bold gradient-text">{price}</span>
          </div>
        </CardHeader>
        
        <CardContent padding="lg">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter padding="lg" border justify="center">
          <button
            onClick={onButtonClick}
            className={cn(
              'w-full py-2 px-4 rounded-lg font-medium transition-all duration-200',
              popular 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
            )}
          >
            {buttonText}
          </button>
        </CardFooter>
      </Card>
    );
  }
);

PricingCard.displayName = 'PricingCard';

// Feature Card Preset
export interface FeatureCardProps extends Omit<CardProps, 'children'> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      ...cardProps
    },
    ref
  ) => {
    return (
      <Card ref={ref} padding="lg" {...cardProps}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-center leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </Card>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

// Export all components
export {
  Card as default,
};
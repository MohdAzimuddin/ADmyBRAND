"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

// TypeScript interfaces
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: 'default' | 'bordered' | 'separated' | 'ghost';
  iconType?: 'chevron' | 'plus';
  children: React.ReactNode;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  hideIcon?: boolean;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Context for sharing accordion state
interface AccordionContextValue {
  expandedItems: string[];
  onItemToggle: (value: string) => void;
  variant: AccordionProps['variant'];
  iconType: AccordionProps['iconType'];
  disabled?: boolean;
}

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  disabled?: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

// Custom hook for smooth height animation
const useHeightAnimation = (isExpanded: boolean, duration = 300) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(0);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    if (isExpanded) {
      // Expanding
      const scrollHeight = element.scrollHeight;
      setHeight(scrollHeight);
      
      // Set to auto after animation completes for dynamic content
      const timer = setTimeout(() => {
        if (ref.current && isExpanded) {
          setHeight('auto');
        }
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      // Collapsing
      if (height === 'auto') {
        setHeight(element.scrollHeight);
      }
      
      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [isExpanded, duration, height]);

  return { ref, height };
};

// Variant styles
const accordionVariants = {
  default: {
    container: 'space-y-2',
    item: 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
    trigger: 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800',
    content: 'bg-white dark:bg-gray-900',
  },
  bordered: {
    container: 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
    item: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
    trigger: 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800',
    content: 'bg-white dark:bg-gray-900',
  },
  separated: {
    container: 'space-y-4',
    item: 'border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden',
    trigger: 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800',
    content: 'bg-gray-50 dark:bg-gray-800',
  },
  ghost: {
    container: 'space-y-1',
    item: 'overflow-hidden',
    trigger: 'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg',
    content: 'bg-transparent',
  },
};

// Main Accordion component
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = 'single',
      collapsible = true,
      defaultValue,
      value,
      onValueChange,
      variant = 'default',
      iconType = 'chevron',
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Initialize expanded items
    const [expandedItems, setExpandedItems] = useState<string[]>(() => {
      if (value !== undefined) {
        return Array.isArray(value) ? value : value ? [value] : [];
      }
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
      }
      return [];
    });

    // Update expanded items when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setExpandedItems(Array.isArray(value) ? value : value ? [value] : []);
      }
    }, [value]);

    // Handle item toggle
    const onItemToggle = useCallback(
      (itemValue: string) => {
        const newExpandedItems = [...expandedItems];
        const itemIndex = newExpandedItems.indexOf(itemValue);

        if (type === 'single') {
          if (itemIndex >= 0) {
            // Item is expanded, collapse it (if collapsible)
            const newValue = collapsible ? [] : newExpandedItems;
            setExpandedItems(newValue);
            onValueChange?.(newValue.length > 0 ? newValue[0] : '');
          } else {
            // Expand this item, collapse others
            const newValue = [itemValue];
            setExpandedItems(newValue);
            onValueChange?.(itemValue);
          }
        } else {
          // Multiple type
          if (itemIndex >= 0) {
            // Item is expanded, collapse it
            newExpandedItems.splice(itemIndex, 1);
          } else {
            // Item is collapsed, expand it
            newExpandedItems.push(itemValue);
          }
          setExpandedItems(newExpandedItems);
          onValueChange?.(newExpandedItems);
        }
      },
      [expandedItems, type, collapsible, onValueChange]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      const triggers = Array.from(
        (e.currentTarget as HTMLElement).querySelectorAll('[data-accordion-trigger]')
      ) as HTMLButtonElement[];
      
      const currentIndex = triggers.findIndex(trigger => trigger === e.target);
      
      if (currentIndex === -1) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % triggers.length;
          triggers[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
          triggers[prevIndex]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          triggers[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          triggers[triggers.length - 1]?.focus();
          break;
      }
    }, []);

    const contextValue = useMemo(
      () => ({
        expandedItems,
        onItemToggle,
        variant,
        iconType,
      }),
      [expandedItems, onItemToggle, variant, iconType]
    );

    const variantClasses = accordionVariants[variant];

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(variantClasses.container, className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

// AccordionItem component
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, children, className, ...props }, ref) => {
    const context = useContext(AccordionContext);
    
    if (!context) {
      throw new Error('AccordionItem must be used within an Accordion');
    }

    const isExpanded = context.expandedItems.includes(value);
    const variantClasses = accordionVariants[context.variant];

    const itemContextValue = useMemo(
      () => ({
        value,
        isExpanded,
        disabled,
      }),
      [value, isExpanded, disabled]
    );

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <div
          ref={ref}
          className={cn(variantClasses.item, className)}
          data-state={isExpanded ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

// AccordionTrigger component
export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, hideIcon = false, className, ...props }, ref) => {
    const accordionContext = useContext(AccordionContext);
    const itemContext = useContext(AccordionItemContext);

    if (!accordionContext || !itemContext) {
      throw new Error('AccordionTrigger must be used within an AccordionItem');
    }

    const { onItemToggle, iconType } = accordionContext;
    const { value, isExpanded, disabled } = itemContext;
    const variantClasses = accordionVariants[accordionContext.variant];

    const handleClick = useCallback(() => {
      if (!disabled) {
        onItemToggle(value);
      }
    }, [disabled, onItemToggle, value]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    }, [handleClick]);

    // Icon component with animation
    const IconComponent = iconType === 'plus' 
      ? (isExpanded ? Minus : Plus)
      : ChevronDown;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          // Base styles
          'flex w-full items-center justify-between p-4 text-left',
          'font-medium transition-all duration-200 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900',
          // Mobile touch targets
          'min-h-[44px] md:min-h-[40px]',
          // Variant styles
          variantClasses.trigger,
          // Disabled styles
          disabled && 'opacity-50 cursor-not-allowed',
          // Text color
          'text-gray-900 dark:text-gray-100',
          className
        )}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${value}`}
        data-accordion-trigger
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span className="flex-1 text-sm md:text-base pr-2">
          {children}
        </span>
        
        {!hideIcon && (
          <div className="flex-shrink-0 ml-2">
            <IconComponent
              className={cn(
                'h-5 w-5 transition-transform duration-200 ease-out',
                'text-gray-500 dark:text-gray-400',
                // Rotation animation for chevron
                iconType === 'chevron' && isExpanded && 'rotate-180',
                // Scale animation for plus/minus
                iconType === 'plus' && 'scale-100 hover:scale-110'
              )}
            />
          </div>
        )}
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

// AccordionContent component
export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, ref) => {
    const accordionContext = useContext(AccordionContext);
    const itemContext = useContext(AccordionItemContext);

    if (!accordionContext || !itemContext) {
      throw new Error('AccordionContent must be used within an AccordionItem');
    }

    const { isExpanded, value } = itemContext;
    const variantClasses = accordionVariants[accordionContext.variant];
    
    // Use height animation hook
    const { ref: animationRef, height } = useHeightAnimation(isExpanded);

    return (
      <div
        ref={animationRef}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-out',
          variantClasses.content
        )}
        style={{ height }}
        id={`accordion-content-${value}`}
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
      >
        <div
          ref={ref}
          className={cn(
            'p-4 pt-0 text-sm md:text-base',
            'text-gray-600 dark:text-gray-300',
            'leading-relaxed',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

// Utility hook for accordion state management
export const useAccordion = (type: 'single' | 'multiple' = 'single') => {
  const [value, setValue] = useState<string | string[]>(
    type === 'single' ? '' : []
  );

  const handleValueChange = useCallback(
    (newValue: string | string[]) => {
      setValue(newValue);
    },
    []
  );

  return {
    value,
    onValueChange: handleValueChange,
  };
};

// FAQ-specific accordion component
export interface FAQAccordionProps {
  faqs: Array<{
    id: string;
    question: string;
    answer: string | React.ReactNode;
  }>;
  variant?: AccordionProps['variant'];
  iconType?: AccordionProps['iconType'];
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  variant = 'separated',
  iconType = 'chevron',
  className,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      variant={variant}
      iconType={iconType}
      className={className}
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            {typeof faq.answer === 'string' ? (
              <p className="whitespace-pre-line">{faq.answer}</p>
            ) : (
              faq.answer
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Accordion;




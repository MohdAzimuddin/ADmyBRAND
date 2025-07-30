"use client";
import React, { 
  forwardRef, 
  useEffect, 
  useRef, 
  useCallback, 
  createContext, 
  useContext,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// TypeScript interfaces
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
  className?: string;
  backdropClassName?: string;
  contentClassName?: string;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Modal context for sharing state between components
interface ModalContextValue {
  onClose: () => void;
  size: ModalProps['size'];
}

const ModalContext = createContext<ModalContextValue | null>(null);

// Size configurations
const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-none m-4 h-[calc(100vh-2rem)]',
};

// Focus trap hook
const useFocusTrap = (isOpen: boolean, modalRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when modal opens
    firstElement?.focus();

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, modalRef]);
};

// Body scroll prevention hook
const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

// Animation component
const ModalAnimation: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
  onAnimationComplete?: () => void;
}> = ({ isOpen, children, onAnimationComplete }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        onAnimationComplete?.();
      }, 200); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAnimationComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        'transition-all duration-200 ease-out',
        isOpen
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95'
      )}
    >
      {children}
    </div>
  );
};

// Main Modal component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  preventBodyScroll = true,
  className,
  backdropClassName,
  contentClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Initialize portal element
  useEffect(() => {
    const element = document.getElementById('modal-root') || document.body;
    setPortalElement(element);
  }, []);

  // Handle ESC key
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEsc, isOpen, onClose]);

  // Focus trap
  useFocusTrap(isOpen, modalRef);

  // Body scroll lock
  useBodyScrollLock(isOpen && preventBodyScroll);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  if (!portalElement) return null;

  const modalContent = (
    <ModalAnimation isOpen={isOpen}>
      <div
        className={cn(
          // Base backdrop styles
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          // Glassmorphism backdrop with blur
          'bg-black/20 backdrop-blur-sm',
          // Dark mode support
          'dark:bg-black/40',
          backdropClassName
        )}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          ref={modalRef}
          className={cn(
            // Base modal styles
            'relative w-full max-h-[90vh] overflow-hidden',
            // Glassmorphism content with blur and transparency
            'bg-white/95 backdrop-blur-xl',
            'dark:bg-gray-900/95',
            // Border and shadow
            'border border-white/20 shadow-2xl',
            'dark:border-gray-800/50',
            // Rounded corners
            'rounded-2xl',
            // Size variants
            modalSizes[size],
            // Full size special handling
            size === 'full' && 'overflow-auto',
            contentClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalContext.Provider value={{ onClose, size }}>
            {children}
          </ModalContext.Provider>

          {/* Global close button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className={cn(
                'absolute top-4 right-4 z-10',
                'p-2 rounded-full',
                'bg-gray-100 hover:bg-gray-200',
                'dark:bg-gray-800 dark:hover:bg-gray-700',
                'text-gray-500 hover:text-gray-700',
                'dark:text-gray-400 dark:hover:text-gray-200',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'focus:ring-offset-2 dark:focus:ring-offset-gray-900'
              )}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </ModalAnimation>
  );

  return createPortal(modalContent, portalElement);
};

// Modal Header component
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, showCloseButton = false, onClose, className, ...props }, ref) => {
    const context = useContext(ModalContext);
    const handleClose = onClose || context?.onClose;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between p-6 pb-4',
          'border-b border-gray-200/50 dark:border-gray-700/50',
          className
        )}
        {...props}
      >
        <div className="flex-1">
          {typeof children === 'string' ? (
            <h2 
              id="modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              {children}
            </h2>
          ) : (
            children
          )}
        </div>
        
        {showCloseButton && handleClose && (
          <button
            onClick={handleClose}
            className={cn(
              'ml-4 p-1 rounded-full',
              'text-gray-400 hover:text-gray-600',
              'dark:text-gray-500 dark:hover:text-gray-300',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'focus:ring-offset-2 dark:focus:ring-offset-gray-900'
            )}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

// Modal Body component
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(ModalContext);
    const isFullSize = context?.size === 'full';

    return (
      <div
        ref={ref}
        className={cn(
          'p-6',
          isFullSize ? 'flex-1 overflow-auto' : 'max-h-[60vh] overflow-auto',
          // Custom scrollbar styling
          'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent',
          'dark:scrollbar-thumb-gray-600',
          className
        )}
        id="modal-description"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

// Modal Footer component
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-end gap-3 p-6 pt-4',
          'border-t border-gray-200/50 dark:border-gray-700/50',
          'bg-gray-50/50 dark:bg-gray-800/50',
          'rounded-b-2xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';

// Utility hook for modal state management
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

// Confirmation Modal component (common use case)
export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
}) => {
  const variantStyles = {
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg',
            'bg-gray-200 text-gray-900 hover:bg-gray-300',
            'dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-gray-500',
            'transition-colors duration-200'
          )}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-lg text-white',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'transition-colors duration-200',
            variantStyles[variant]
          )}
        >
          {confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default Modal;
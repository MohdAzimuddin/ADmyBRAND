"use client"
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
 
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in', 'animate-slide-up');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative overflow-hidden min-h-[90vh] flex items-center',
        'opacity-0 translate-y-10' // Initial state for animations
      )}
    >
      {/* Background gradient with glassmorphism */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              AI-Powered Marketing at <span className="whitespace-nowrap">Light Speed</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Transform your marketing with ADmyBRAND's AI suite. Generate high-converting content,
              automate campaigns, and predict performance with 92% accuracy—all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Start your free trial"
              >
                Start Free Trial
              </Button>
          <a
  href="https://www.youtube.com/watch?v=RV9BmWnG7rk"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block"
>
  <Button
    variant="outline"
    size="lg"
    className="group"
    aria-label="Watch product demo"
  >
    <Play className="w-4 h-4 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
    Watch Demo
  </Button>
</a>
            </div>

            <div className="pt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>No credit card required • 14-day free trial • Cancel anytime</p>
            </div>
          </div>

          {/* Hero Image/Illustration Placeholder */}
          <div className="relative">
            <div className="glass-card rounded-3xl overflow-hidden aspect-square w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M12 19V6M5 12l7-7 7 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    AI Marketing Suite Preview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Experience the power of AI-driven marketing automation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Export both named and default
export { HeroSection };
export default HeroSection;
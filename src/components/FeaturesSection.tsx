"use client";
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  Zap, Target, BarChart3, Bot, Globe, 
  TrendingUp, Users, FileText, Palette, Code2, ShieldCheck 
} from 'lucide-react';

// Icon mapping
const iconMap = {
  FileText,
  BarChart3,
  TrendingUp,
  Target,
  Bot,
  Globe,
  Zap,
  Users,
  Palette,
  Code2,
  ShieldCheck
} as const;

// Define features data directly in the component to avoid server/client issues
const features = [
  {
    id: 'smart-content',
    title: 'Smart Content Generation',
    description: 'Our AI crafts high-converting marketing copy in seconds, tailored to your brand voice. Generate blog posts, ads, emails, and social media content that resonates with your audience.',
    iconName: 'FileText' as keyof typeof iconMap,
    tag: 'Popular' as const
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics Engine',
    description: 'Anticipate customer behavior with 92% accuracy. Our AI analyzes historical data to forecast trends, helping you stay ahead of the competition and allocate resources effectively.',
    iconName: 'BarChart3' as keyof typeof iconMap,
    tag: 'New' as const
  },
  {
    id: 'campaign-optimization',
    title: 'Auto Campaign Optimization',
    description: 'Dynamically adjust your marketing campaigns in real-time. Our AI tests thousands of variations to maximize ROI while you focus on strategy.',
    iconName: 'TrendingUp' as keyof typeof iconMap
  },
  {
    id: 'audience-targeting',
    title: 'Precision Audience Targeting',
    description: 'Laser-focus your ads with AI-powered segmentation that identifies high-value customer profiles and predicts conversion likelihood.',
    iconName: 'Target' as keyof typeof iconMap
  },
  {
    id: 'conversational-ai',
    title: 'Conversational AI Assistants',
    description: 'Deploy intelligent chatbots that handle 80% of customer inquiries, qualify leads, and book appointments - available 24/7 across all your channels.',
    iconName: 'Bot' as keyof typeof iconMap,
    tag: 'New' as const
  },
  {
    id: 'multi-channel',
    title: 'Omnichannel Campaign Sync',
    description: 'Seamlessly coordinate messaging across email, social, ads, and SMS. Our AI ensures consistent branding and optimal send times for each channel.',
    iconName: 'Globe' as keyof typeof iconMap
  },
  {
    id: 'performance-boost',
    title: 'Performance Boost Technology',
    description: 'Automatically A/B test every element of your marketing and implement winning combinations 3x faster than manual testing.',
    iconName: 'Zap' as keyof typeof iconMap,
    tag: 'Popular' as const
  },
  {
    id: 'team-collab',
    title: 'AI-Powered Team Collaboration',
    description: 'Our smart workspace suggests content improvements, predicts campaign outcomes, and facilitates seamless collaboration between marketing teams.',
    iconName: 'Users' as keyof typeof iconMap
  },
  {
    id: 'brand-voice',
    title: 'Brand Voice Consistency AI',
    description: 'Maintain perfect brand consistency across all content with our proprietary tone analysis that learns and enforces your unique brand guidelines.',
    iconName: 'Palette' as keyof typeof iconMap,
    tag: 'Beta' as const
  },
  {
    id: 'code-free',
    title: 'No-Code Automation Builder',
    description: 'Create sophisticated marketing workflows without technical skills. Drag, drop, and deploy automation that would normally require developer resources.',
    iconName: 'Code2' as keyof typeof iconMap
  },
  {
    id: 'compliance',
    title: 'Automated Compliance Guard',
    description: 'Sleep easy knowing our AI scans all content for regulatory compliance (GDPR, CCPA) and suggests edits to keep you protected.',
    iconName: 'ShieldCheck' as keyof typeof iconMap
  }
];

// Simple Card component to avoid import issues
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof iconMap;
  tag?: 'New' | 'Popular' | 'Beta';
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll animation trigger - Fixed useEffect cleanup
  useEffect(() => {
    const currentCards = cardRefs.current; // Capture current refs
    const currentSection = sectionRef.current; // Capture current section ref
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    if (currentSection) observer.observe(currentSection);

    return () => {
      // Use captured values in cleanup
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
      if (currentSection) observer.unobserve(currentSection);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 md:py-24 lg:py-32 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            AI-Powered Marketing Superpowers
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to automate, optimize, and scale your marketing
            with artificial intelligence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <FeatureCard
                id={feature.id}
                title={feature.title}
                description={feature.description}
                iconName={feature.iconName}
                tag={feature.tag}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Fixed FeatureCard component - removed unused id parameter
const FeatureCard = ({ title, description, iconName, tag }: Omit<FeatureCardProps, 'id'>) => {
  const IconComponent = iconMap[iconName];
  
  return (
    <Card
      className={cn(
        'h-full p-6 md:p-8 transition-all duration-300 ease-out',
        'hover:shadow-xl hover:-translate-y-1',
        'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
        'group cursor-pointer bg-white dark:bg-gray-900'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Icon with gradient background */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {/* Tag (if present) */}
        {tag && (
          <span
            className={cn(
              'inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold w-fit',
              tag === 'New' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
              tag === 'Popular' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
              tag === 'Beta' && 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
            )}
          >
            {tag}
          </span>
        )}

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Learn More Link */}
        <div className="mt-auto">
          <button
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            aria-label={`Learn more about ${title}`}
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};


export { FeaturesSection };
export default FeaturesSection;
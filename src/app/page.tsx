// app/page.tsx - Server Component Version (Better for SEO)
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// TypeScript interfaces
interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

// Lazy-loaded components for better performance
const HeroSection = dynamic(() => import('@/components/HeroSection').then(mod => ({ default: mod.default || mod.HeroSection })), {
  loading: () => <div className="h-screen animate-pulse bg-gray-100" />,
});

const FeaturesSection = dynamic(() => import('@/components/FeaturesSection').then(mod => ({ default: mod.default || mod.FeaturesSection })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const PricingSection = dynamic(() => import('@/components/PricingSection').then(mod => ({ default: mod.default || mod.PricingSection })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection').then(mod => ({ default: mod.default || mod.TestimonialsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const FAQSection = dynamic(() => import('@/components/FAQSection').then(mod => ({ default: mod.default || mod.FAQSection })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => ({ default: mod.default || mod.ContactForm })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
});

// Reusable Section component
const Section = ({ id, className = '', children }: SectionProps) => (
  <section 
    id={id}
    className={`py-16 md:py-24 lg:py-32 scroll-mt-20 ${className}`}
    data-section={id}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {children}
    </div>
  </section>
);

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: 'ADmyBRAND AI Suite | Next-Gen Marketing Automation',
    template: '%s | ADmyBRAND'
  },
  description: 'Transform your marketing strategy with AI-powered automation, content generation, and analytics from ADmyBRAND AI Suite.',
  keywords: [
    'AI marketing',
    'content generation',
    'marketing automation',
    'ADmyBRAND',
    'AI suite',
    'digital marketing tools'
  ],
  authors: [{ name: 'ADmyBRAND', url: 'https://admybrand.com' }],
  openGraph: {
    title: 'ADmyBRAND AI Suite',
    description: 'AI-powered marketing automation suite for modern businesses',
    url: 'https://admybrand.com',
    siteName: 'ADmyBRAND',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ADmyBRAND AI Suite Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADmyBRAND AI Suite',
    description: 'AI-powered marketing automation suite for modern businesses',
    creator: '@admybrand',
    images: ['/twitter-image.jpg'],
  },
  metadataBase: new URL('https://admybrand.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function LandingPage() {
  return (
    <>
      <Section id="hero">
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>}>
          <HeroSection />
        </Suspense>
      </Section>

      <Section id="features" className="bg-muted/10">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading features...</div>
        </div>}>
          <FeaturesSection />
        </Suspense>
      </Section>

      <Section id="pricing">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading pricing...</div>
        </div>}>
          <PricingSection />
        </Suspense>
      </Section>

      <Section id="testimonials" className="bg-muted/10">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading testimonials...</div>
        </div>}>
          <TestimonialsSection />
        </Suspense>
      </Section>

      <Section id="faq">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading FAQ...</div>
        </div>}>
          <FAQSection />
        </Suspense>
      </Section>

      <Section id="contact">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading contact form...</div>
        </div>}>
          <ContactForm />
        </Suspense>
      </Section>
    </>
  );
}




// // src/app/page.tsx
// import TestComponent from '@/components/TestTailwind';

// export default function HomePage() {
//   return <TestComponent />;
// }
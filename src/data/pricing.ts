export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: string;
    annually?: string;
  };
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  mostPopularText?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: {
      monthly: '$29/month',
      annually: '$24/month ($288 billed yearly)'
    },
    description: 'Perfect for solopreneurs and small teams dipping their toes into AI-powered marketing',
    features: [
      '5 AI content generations per month',
      'Basic campaign analytics',
      '1 social media integration',
      'Email support (48h response)',
      'Standard AI models',
      'Up to 1,000 contacts',
      '3 automated workflows'
    ],
    isPopular: false,
    ctaText: 'Start with Starter'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: {
      monthly: '$99/month',
      annually: '$83/month ($996 billed yearly)'
    },
    description: 'For growing businesses serious about scaling with AI marketing automation',
    features: [
      '50 AI content generations per month',
      'Advanced predictive analytics',
      '5 platform integrations',
      'Priority support (24h response)',
      'Premium AI models + GPT-4 access',
      'Up to 10,000 contacts',
      '20 automated workflows',
      'A/B testing tools',
      'Omnichannel campaign builder',
      'Basic compliance checks'
    ],
    isPopular: true,
    ctaText: 'Get Professional',
    mostPopularText: 'Most Popular Choice'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: '$299/month',
      annually: '$249/month ($2,988 billed yearly)'
    },
    description: 'End-to-end AI marketing suite for agencies and high-growth companies',
    features: [
      'Unlimited AI content generations',
      'Enterprise-grade analytics dashboard',
      'Unlimited integrations',
      '24/7 dedicated support',
      'All premium AI models + fine-tuning',
      'Unlimited contacts',
      'Unlimited workflows',
      'Multi-team collaboration',
      'AI-powered compliance guard',
      'Custom brand voice training',
      'API access',
      'Dedicated account manager',
      'Quarterly strategy reviews'
    ],
    isPopular: false,
    ctaText: 'Contact Sales'
  }
];

// Additional pricing information
export const pricingFaq = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade, downgrade, or cancel anytime with no hidden fees."
  },
  {
    question: "Is there a free trial?",
    answer: "We offer a 14-day free trial for all plans with full feature access."
  },
  {
    question: "How does annual billing work?",
    answer: "Save up to 17% by paying annually. Your subscription auto-renews each year unless canceled."
  },
  {
    question: "What payment methods do you accept?",
    answer: "All major credit cards, PayPal, and bank transfers for enterprise plans."
  }
];
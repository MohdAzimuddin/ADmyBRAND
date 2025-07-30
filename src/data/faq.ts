export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: 'pricing' | 'features' | 'technical' | 'security' | 'business';
}

export const faqs: FAQ[] = [
  {
    id: 'pricing-1',
    question: 'Whats included in the free trial?',
    answer: 'Our 14-day free trial gives you full access to all Professional plan features, including 50 AI content generations, advanced analytics, and 5 integrations. No credit card required - you can upgrade, downgrade, or cancel anytime.',
    category: 'pricing'
  },
  {
    id: 'security-1',
    question: 'How is my marketing data secured?',
    answer: 'We use enterprise-grade security including AES-256 encryption, SOC 2 Type II compliance, and regular third-party audits. Your data never trains public AI models and is isolated in secure cloud storage with role-based access controls.',
    category: 'security'
  },
  {
    id: 'features-1',
    question: 'How does your AI compare to ChatGPT for marketing?',
    answer: 'ADmyBRAND specializes in marketing-specific AI with proprietary models fine-tuned on high-converting marketing copy, trained on your brand voice, and integrated with campaign performance data to continuously improve suggestions - far beyond generic AI tools.',
    category: 'features'
  },
  {
    id: 'technical-1',
    question: 'What integrations do you support?',
    answer: 'We offer native integrations with all major platforms including Google Ads, Meta Business Suite, Mailchimp, Salesforce, Shopify, and Zapier for custom connections. Our API allows full platform connectivity for enterprise clients.',
    category: 'technical'
  },
  {
    id: 'business-1',
    question: 'How quickly will we see results?',
    answer: 'Most customers see measurable improvements within 2 weeks - 43% reduce content production time immediately, and campaigns using our AI optimizations typically show 20-40% better performance within the first billing cycle.',
    category: 'business'
  },
  {
    id: 'pricing-2',
    question: 'Can I change plans later?',
    answer: 'Absolutely. You can upgrade, downgrade, or switch between monthly and annual billing at any time with pro-rated adjustments. All your data and configurations carry over seamlessly.',
    category: 'pricing'
  },
  {
    id: 'technical-2',
    question: 'How difficult is setup?',
    answer: 'Most customers are fully operational in under an hour. Our onboarding wizard guides you through connecting accounts, setting up brand guidelines, and training the AI. For enterprise plans, we provide dedicated setup assistance.',
    category: 'technical'
  },
  {
    id: 'security-2',
    question: 'Where is our data stored?',
    answer: 'All customer data is stored in GDPR-compliant AWS data centers in your region (US, EU, or Asia-Pacific). You maintain full ownership of all generated content and customer data.',
    category: 'security'
  },
  {
    id: 'features-2',
    question: 'Can the AI maintain our brand voice?',
    answer: 'Yes! Our Brand Voice Engine analyzes your existing content to learn tone, terminology, and style. It continuously improves with feedback and performs better than human writers at maintaining consistency across all channels.',
    category: 'features'
  },
  {
    id: 'business-2',
    question: 'What if we need help?',
    answer: 'All plans include email support with 24-hour response times (12 hours for Professional). Enterprise includes a dedicated account manager and 1-hour emergency support. We also offer extensive documentation and video tutorials.',
    category: 'business'
  },
  {
    id: 'pricing-3',
    question: 'Are there hidden fees?',
    answer: 'No hidden fees - our pricing is transparent. The only additional cost would be if you exceed your plan\'s contact limits or need custom enterprise features. We always notify you before any overage charges apply.',
    category: 'pricing'
  },
  {
    id: 'security-3',
    question: 'Is our data used to train your AI?',
    answer: 'Never. Your data remains completely private and is never used to train our core AI models. We use only licensed datasets and anonymized, opt-in customer data for model improvements.',
    category: 'security'
  }
];
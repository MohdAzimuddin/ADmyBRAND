// import { Zap, Target, BarChart3, Bot, Globe, Mail, TrendingUp, Users, FileText, Palette, Code2, ShieldCheck } from 'lucide-react';

// export interface Feature {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   tag?: 'New' | 'Popular' | 'Beta';
// }

// export const features: Feature[] = [
//   {
//     id: 'smart-content',
//     title: 'Smart Content Generation',
//     description: 'Our AI crafts high-converting marketing copy in seconds, tailored to your brand voice. Generate blog posts, ads, emails, and social media content that resonates with your audience.',
//     icon: <FileText className="w-6 h-6" />,
//     tag: 'Popular'
//   },
//   {
//     id: 'predictive-analytics',
//     title: 'Predictive Analytics Engine',
//     description: 'Anticipate customer behavior with 92% accuracy. Our AI analyzes historical data to forecast trends, helping you stay ahead of the competition and allocate resources effectively.',
//     icon: <BarChart3 className="w-6 h-6" />,
//     tag: 'New'
//   },
//   {
//     id: 'campaign-optimization',
//     title: 'Auto Campaign Optimization',
//     description: 'Dynamically adjust your marketing campaigns in real-time. Our AI tests thousands of variations to maximize ROI while you focus on strategy.',
//     icon: <TrendingUp className="w-6 h-6" />
//   },
//   {
//     id: 'audience-targeting',
//     title: 'Precision Audience Targeting',
//     description: 'Laser-focus your ads with AI-powered segmentation that identifies high-value customer profiles and predicts conversion likelihood.',
//     icon: <Target className="w-6 h-6" />
//   },
//   {
//     id: 'conversational-ai',
//     title: 'Conversational AI Assistants',
//     description: 'Deploy intelligent chatbots that handle 80% of customer inquiries, qualify leads, and book appointments - available 24/7 across all your channels.',
//     icon: <Bot className="w-6 h-6" />,
//     tag: 'New'
//   },
//   {
//     id: 'multi-channel',
//     title: 'Omnichannel Campaign Sync',
//     description: 'Seamlessly coordinate messaging across email, social, ads, and SMS. Our AI ensures consistent branding and optimal send times for each channel.',
//     icon: <Globe className="w-6 h-6" />
//   },
//   {
//     id: 'performance-boost',
//     title: 'Performance Boost Technology',
//     description: 'Automatically A/B test every element of your marketing and implement winning combinations 3x faster than manual testing.',
//     icon: <Zap className="w-6 h-6" />,
//     tag: 'Popular'
//   },
//   {
//     id: 'team-collab',
//     title: 'AI-Powered Team Collaboration',
//     description: 'Our smart workspace suggests content improvements, predicts campaign outcomes, and facilitates seamless collaboration between marketing teams.',
//     icon: <Users className="w-6 h-6" />
//   },
//   {
//     id: 'brand-voice',
//     title: 'Brand Voice Consistency AI',
//     description: 'Maintain perfect brand consistency across all content with our proprietary tone analysis that learns and enforces your unique brand guidelines.',
//     icon: <Palette className="w-6 h-6" />,
//     tag: 'Beta'
//   },
//   {
//     id: 'code-free',
//     title: 'No-Code Automation Builder',
//     description: 'Create sophisticated marketing workflows without technical skills. Drag, drop, and deploy automation that would normally require developer resources.',
//     icon: <Code2 className="w-6 h-6" />
//   },
//   {
//     id: 'compliance',
//     title: 'Automated Compliance Guard',
//     description: 'Sleep easy knowing our AI scans all content for regulatory compliance (GDPR, CCPA) and suggests edits to keep you protected.',
//     icon: <ShieldCheck className="w-6 h-6" />
//   }
// ];


export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag?: 'New' | 'Popular' | 'Beta';
}

export const features: Feature[] = [
  {
    id: 'smart-content',
    title: 'Smart Content Generation',
    description: 'Our AI crafts high-converting marketing copy in seconds, tailored to your brand voice. Generate blog posts, ads, emails, and social media content that resonates with your audience.',
    iconName: 'FileText',
    tag: 'Popular'
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics Engine',
    description: 'Anticipate customer behavior with 92% accuracy. Our AI analyzes historical data to forecast trends, helping you stay ahead of the competition and allocate resources effectively.',
    iconName: 'BarChart3',
    tag: 'New'
  },
  {
    id: 'campaign-optimization',
    title: 'Auto Campaign Optimization',
    description: 'Dynamically adjust your marketing campaigns in real-time. Our AI tests thousands of variations to maximize ROI while you focus on strategy.',
    iconName: 'TrendingUp'
  },
  {
    id: 'audience-targeting',
    title: 'Precision Audience Targeting',
    description: 'Laser-focus your ads with AI-powered segmentation that identifies high-value customer profiles and predicts conversion likelihood.',
    iconName: 'Target'
  },
  {
    id: 'conversational-ai',
    title: 'Conversational AI Assistants',
    description: 'Deploy intelligent chatbots that handle 80% of customer inquiries, qualify leads, and book appointments - available 24/7 across all your channels.',
    iconName: 'Bot',
    tag: 'New'
  },
  {
    id: 'multi-channel',
    title: 'Omnichannel Campaign Sync',
    description: 'Seamlessly coordinate messaging across email, social, ads, and SMS. Our AI ensures consistent branding and optimal send times for each channel.',
    iconName: 'Globe'
  },
  {
    id: 'performance-boost',
    title: 'Performance Boost Technology',
    description: 'Automatically A/B test every element of your marketing and implement winning combinations 3x faster than manual testing.',
    iconName: 'Zap',
    tag: 'Popular'
  },
  {
    id: 'team-collab',
    title: 'AI-Powered Team Collaboration',
    description: 'Our smart workspace suggests content improvements, predicts campaign outcomes, and facilitates seamless collaboration between marketing teams.',
    iconName: 'Users'
  },
  {
    id: 'brand-voice',
    title: 'Brand Voice Consistency AI',
    description: 'Maintain perfect brand consistency across all content with our proprietary tone analysis that learns and enforces your unique brand guidelines.',
    iconName: 'Palette',
    tag: 'Beta'
  },
  {
    id: 'code-free',
    title: 'No-Code Automation Builder',
    description: 'Create sophisticated marketing workflows without technical skills. Drag, drop, and deploy automation that would normally require developer resources.',
    iconName: 'Code2'
  },
  {
    id: 'compliance',
    title: 'Automated Compliance Guard',
    description: 'Sleep easy knowing our AI scans all content for regulatory compliance (GDPR, CCPA) and suggests edits to keep you protected.',
    iconName: 'ShieldCheck'
  }
];
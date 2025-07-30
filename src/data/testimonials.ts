export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string | null;
  rating: number;
  industry?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'CMO',
    company: 'GlobalTech Solutions',
    content: 'ADmyBRAND AI reduced our content production time by 70% while improving engagement metrics across all channels. The predictive analytics alone helped us increase campaign ROI by 40% last quarter.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    industry: 'Enterprise SaaS'
  },
  {
    id: 'testimonial-2',
    name: 'James Rodriguez',
    role: 'Marketing Director',
    company: 'UrbanEats',
    content: 'Our email open rates jumped from 22% to 38% after implementing ADmyBRAND\'s AI subject line generator. The platform pays for itself in saved agency costs and improved conversion rates.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    industry: 'Food Delivery'
  },
  {
    id: 'testimonial-3',
    name: 'Priya Patel',
    role: 'Founder & CEO',
    company: 'Bloom Cosmetics',
    content: 'As a bootstrapped startup, ADmyBRAND gave us enterprise-grade marketing tools at a fraction of the cost. We scaled from 0 to 50K MRR in 9 months using their AI-powered campaign automation.',
    avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=200&h=200&fit=crop&crop=faces',
    rating: 4,
    industry: 'E-commerce'
  },
  {
    id: 'testimonial-4',
    name: 'Michael Okafor',
    role: 'Head of Growth',
    company: 'Finova Financial',
    content: 'The compliance AI saved us from 3 potential regulatory violations last year while maintaining our brand voice. It\'s like having a 24/7 marketing and legal team rolled into one.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    industry: 'Fintech'
  },
  {
    id: 'testimonial-5',
    name: 'Lisa Wong',
    role: 'Digital Marketing Manager',
    company: 'Adventure Travel Co.',
    content: 'Our social media engagement tripled after implementing ADmyBRAND\'s optimal posting schedule. The AI content suggestions perform 2x better than our manually created posts.',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=faces',
    rating: 4,
    industry: 'Travel & Tourism'
  },
  {
    id: 'testimonial-6',
    name: 'David Müller',
    role: 'E-commerce Director',
    company: 'StyleHaus',
    content: 'We automated 80% of our seasonal campaign production using ADmyBRAND. What used to take our team 3 weeks now takes 2 days, with better performing assets across all European markets.',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=faces',
    rating: 5,
    industry: 'Fashion Retail'
  },
  {
    id: 'testimonial-7',
    role: 'Co-Founder',
    name: 'Alex Johnson',
    company: 'B2B Growth Labs',
    content: 'The AI-powered lead scoring helped us increase our sales teams productivity by 35% and reduced customer acquisition costs by 22% in just 3 months of use.',
    avatar: null, // No avatar - can use placeholder initials
    rating: 4,
    industry: 'Marketing Agency'
  }
];
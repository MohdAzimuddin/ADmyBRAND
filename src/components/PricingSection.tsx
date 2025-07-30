// import { pricingTiers } from '@/data/pricing';

// const PricingSection = () => {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {pricingTiers.map((tier) => (
//             <PricingCard
//               key={tier.id}
//               name={tier.name}
//               price={tier.price}
//               description={tier.description}
//               features={tier.features}
//               isPopular={tier.isPopular}
//               ctaText={tier.ctaText}
//               mostPopularText={tier.mostPopularText}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

"use client";
import React, { useState } from 'react';
import { pricingTiers } from '@/data/pricing';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
 
const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Choose the perfect plan for your business needs. Scale up or down as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
              aria-label="Show monthly pricing"
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                billingCycle === 'annually'
                  ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
              aria-label="Show annual pricing"
            >
              Save 17% Annually
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="relative"
              onMouseEnter={() => setHoveredCard(tier.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge variant="primary" className="shadow-lg">
                    {tier.mostPopularText}
                  </Badge>
                </div>
              )}

              <Card
                className={cn(
                  'h-full transition-all duration-300 overflow-hidden',
                  tier.isPopular
                    ? 'border-blue-500 dark:border-blue-400 ring-1 ring-blue-500/20 dark:ring-blue-400/20'
                    : 'border-gray-200 dark:border-gray-700',
                  hoveredCard === tier.id ? 'shadow-xl -translate-y-2' : 'shadow-md'
                )}
              >
                <div className="p-6 md:p-8 h-full flex flex-col">
                  {/* Tier Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {billingCycle === 'monthly' 
                          ? tier.price.monthly.split('/')[0] 
                          : tier.price.annually?.split('/')[0]}
                      </span>
                      <span className="text-lg text-gray-600 dark:text-gray-400 ml-1 mb-1">
                        {billingCycle === 'monthly' ? '/month' : '/month'}
                      </span>
                    </div>
                    {billingCycle === 'annually' && tier.price.annually && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {tier.price.annually}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={tier.isPopular ? 'primary' : 'outline'}
                    size="lg"
                    className={cn(
                      'w-full mt-auto',
                      tier.isPopular && 'shadow-md hover:shadow-lg'
                    )}
                    aria-label={`Get started with ${tier.name} plan`}
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Need custom solutions for your enterprise?
          </p>
          <Button
            variant="ghost"
            size="lg"
            className="text-blue-600 dark:text-blue-400"
            aria-label="Contact sales for enterprise solutions"
          >
            Contact Sales →
          </Button>
        </div>
      </div>
    </section>
  );
};


export { PricingSection };
export default PricingSection;
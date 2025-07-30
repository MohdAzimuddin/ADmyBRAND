"use client";
import React, { useState } from 'react';
import { faqs } from '@/data/faq';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [itemId] // Single accordion - only one open at a time
    );
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Can't find what you're looking for? <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact our team</a>.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              className="pl-10 pr-4 py-3 w-full border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search frequently asked questions"
            />
          </div>
        </div>

        {/* No results message */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No results found for "{searchQuery}". Try different keywords.
            </p>
          </div>
        )}

        {/* FAQ Accordion - Custom Simple Implementation */}
        {filteredFaqs.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  {/* Trigger Button */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={cn(
                        "text-lg font-semibold pr-4 leading-relaxed transition-colors duration-200",
                        isOpen 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      )}>
                        {faq.question}
                      </h3>
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0",
                          isOpen && "rotate-180"
                        )}
                      />
                    </div>
                  </button>

                  {/* Content with smooth animation */}
                  <div 
                    className={cn(
                      "transition-all duration-300 ease-in-out overflow-hidden",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Can't find the answer you're looking for? Our team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-label="Contact our support team"
              >
                Contact Support
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FAQSection };
export default FAQSection;
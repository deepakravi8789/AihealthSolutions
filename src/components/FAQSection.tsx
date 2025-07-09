import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How accurate is the symptom analysis?",
    answer: "Our AI-powered system provides preliminary insights based on reported symptoms and medical knowledge. While highly sophisticated, it's designed to be a supportive tool rather than a replacement for professional medical diagnosis."
  },
  {
    question: "How is my health data protected?",
    answer: "We implement industry-standard encryption and security measures to protect your health information. Our platform is HIPAA-compliant, and we never share your personal health data with third parties."
  },
  {
    question: "Can I use this service for emergency situations?",
    answer: "This service is not designed for emergency situations. If you're experiencing severe or life-threatening symptoms, please seek immediate medical attention or contact emergency services."
  },
  {
    question: "How often is the medical information updated?",
    answer: "Our medical database is continuously updated with the latest clinical research and guidelines. We work with healthcare professionals to ensure our information remains current and accurate."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our symptom checker
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';
import { useState } from 'react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: 'How does Meal Mail work?',
      answer:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias suscipit modi saepe minus non possimus.',
    },
    {
      question: 'What types of recipes are available?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ipsam quisquam hic qui impedit vero.',
    },
    {
      question: 'Can I customize my meal plan?',
      answer:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam dicta incidunt minus nemo, magnam pariatur!',
    },
    {
      question: 'How do I track my delivery?',
      answer:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam dicta incidunt minus nemo, magnam pariatur!',
    },
    {
      question: 'Is there diet available?',
      answer:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam dicta incidunt minus nemo, magnam pariatur!',
    },
  ];

  return (
    <div className="px-6 md:px-12 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
      <p className="text-sm text-gray-600 mb-4">
        Find answers to common questions about Meal Mail
      </p>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for questions"
        className="w-full md:w-3/4 p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-4 py-3 font-medium bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
            >
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700 bg-white border-t border-gray-200">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

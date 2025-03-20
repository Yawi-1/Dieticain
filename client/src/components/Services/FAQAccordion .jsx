import React, { useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io"

const faqs = [
  {
    question: "How do I get started?",
    answer:
      "After booking, you'll receive an initial questionnaire to help us understand your needs.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can pause or cancel your plan with 7 days' notice.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-2 shadow-md"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center w-full p-4 text-left font-medium"
          >
            <span>{faq.question}</span>
            <span  className={`w-5 h-5 duration-300 transition-transform ${
                openIndex === index ? "rotate-90" : ""
              }`} ><IoIosArrowDroprightCircle size={24}/></span>
             
          </button>
          {openIndex === index && (
            <div className="p-4 text-gray-600">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;

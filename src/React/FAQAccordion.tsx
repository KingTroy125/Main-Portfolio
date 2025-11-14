import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Should I choose subscription or a fixed budget plan?",
    answer: "It depends on your project needs. Subscription plans are ideal for ongoing development and maintenance, providing consistent support over time. Fixed budget plans work better for one-time projects with a clear scope. I'm happy to discuss which option would be most cost-effective for your specific situation."
  },
  {
    question: "Which exact pricing plan is best for me?",
    answer: "The best pricing plan depends on your project scope, timeline, and budget constraints. For small businesses just starting out, the Basic plan often provides the essentials. Growing businesses typically benefit from the Standard plan with more features. Enterprise-level projects usually require the Premium plan for maximum customization and support. Let's discuss your needs to find the perfect fit."
  },
  {
    question: "How much work will I receive in a single month?",
    answer: "On subscription plans, you'll receive dedicated development time each month with regular updates and improvements. The exact output depends on project complexity, but you can expect consistent progress with clear communication about priorities. For fixed projects, we'll establish a detailed timeline with milestones to ensure timely delivery."
  },
  {
    question: "How do I start?",
    answer: "Starting is easy! Simply reach out through the contact form or email, and we'll schedule an initial consultation to discuss your project. After understanding your requirements, I'll propose a suitable approach and pricing. Once we agree on terms, I'll prepare a project plan and we can begin development right away."
  },
  {
    question: "Who makes up your design team?",
    answer: "I work primarily as an independent developer with expertise in both design and development. For larger projects requiring specialized skills, I collaborate with a trusted network of professionals including UI/UX designers, back-end developers, and content creators. This flexible approach ensures your project gets exactly the expertise it needs while maintaining quality and communication."
  },
  {
    question: "Do you work with existing designs or wireframes?",
    answer: "Absolutely! I'm comfortable working with your existing designs, wireframes, or style guides. If you already have design assets, I can implement them faithfully while suggesting improvements where appropriate. If you don't have designs yet, I can help create them or recommend design resources to ensure your project has a cohesive and professional look."
  },
  {
    question: "What happens after the design is approved?",
    answer: "Once designs are approved, I move into the development phase, building your project according to the agreed specifications. You'll receive regular updates and have opportunities to provide feedback throughout the process. After completion, I offer support to ensure everything works perfectly, including testing, bug fixes, and guidance on maintaining your new digital asset."
  }
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className={`border border-[var(--white-icon-tr)] rounded-xl bg-[#1414149c] overflow-hidden transition-all duration-300 hover:bg-[#1e1e1e9c] ${
            openIndex === index ? "shadow-[0_0_15px_rgba(164,118,255,0.15)]" : ""
          }`}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="flex justify-between items-center w-full p-5 text-left transition-colors duration-300"
            aria-expanded={openIndex === index}
          >
            <span className="text-md md:text-lg font-medium text-[var(--white)]">{faq.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ${
                openIndex === index ? "text-[var(--sec)]" : "text-[var(--white-icon)]"
              } transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-5 pt-0 text-[var(--white-icon)] text-md">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion; 
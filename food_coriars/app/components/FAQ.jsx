"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Plus,
  Minus,
  MessageCircleQuestion,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const faqs = [
  {
    q: "How fast is delivery?",
    a: "Usually within 30–45 minutes depending on your location, restaurant preparation time, and traffic conditions.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes. You can pay with cash on delivery or choose from our available online payment methods during checkout.",
  },
  {
    q: "Can I cancel my order?",
    a: "Yes, you can cancel your order before the restaurant starts preparing it. Once preparation has started, cancellation may not be available.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. Once your order is confirmed, you can track its progress and delivery status directly from your account.",
  },
  {
    q: "What if my food arrives late?",
    a: "If your order is taking longer than expected, you can contact our support team and we'll help you resolve the issue.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="relative overflow-hidden bg-white py-20 md:py-24"
    >
      {/* Background decorations */}
      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-yellow-50" />
      <div className="absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-yellow-50" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left Content */}
          <div data-aos="fade-right" className="lg:sticky lg:top-24">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">
              <MessageCircleQuestion size={16} />
              Help Center
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              Frequently Asked{" "}
              <span className="text-yellow-500">Questions</span>
            </h2>

            <p className="mt-5 max-w-md leading-7 text-gray-500">
              Have questions about ordering, delivery, payments, or your
              account? We've answered some of the most common questions below.
            </p>

            {/* Trust points */}
            <div className="mt-7 space-y-3">
              {[
                "Quick and reliable delivery",
                "Secure payment options",
                "24/7 customer support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-gray-700"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-yellow-500"
                  />
                  {item}
                </div>
              ))}
            </div>

            {/* Support CTA */}
            <div className="mt-9 rounded-2xl bg-gray-950 p-5 text-white shadow-xl">
              <p className="text-sm font-bold">Still have a question?</p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Our support team is always ready to help you.
              </p>

              <button className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                Contact Support
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* FAQ List */}
          <div data-aos="fade-left" data-aos-delay="150">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.q}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-yellow-300 bg-yellow-50/50 shadow-md"
                        : "border-gray-100 bg-white shadow-sm hover:border-yellow-200 hover:shadow-md"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-6"
                    >
                      {/* Number */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold transition-all duration-300 ${
                          isOpen
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Question */}
                      <span
                        className={`flex-1 text-sm font-bold md:text-base ${
                          isOpen ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {faq.q}
                      </span>

                      {/* Toggle */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "bg-gray-900 text-yellow-400"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isOpen ? (
                          <Minus size={17} />
                        ) : (
                          <Plus size={17} />
                        )}
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-yellow-100 px-5 pb-6 pt-4 pl-[68px] md:px-6 md:pl-[76px]">
                          <p className="text-sm leading-7 text-gray-500">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
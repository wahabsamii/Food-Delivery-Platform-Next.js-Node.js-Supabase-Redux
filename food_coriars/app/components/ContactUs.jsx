"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock3,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-yellow-400 py-20 md:py-24"
    >
      {/* Background decorations */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-black/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div data-aos="fade-up" className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-sm font-bold text-gray-900">
            <MessageCircle size={16} />
            Contact Us
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            Let's Start a{" "}
            <span className="text-white">Conversation</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-800/70 md:text-lg">
            Have a question, feedback, or need help with your order? Our team
            is here to help you.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[32px] bg-gray-950 shadow-2xl">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left */}
            <div
              data-aos="fade-right"
              className="relative overflow-hidden p-7 text-white md:p-10 lg:p-12"
            >
              {/* Glow */}
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

              <div className="relative">
                <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">
                  Get in touch
                </span>

                <h3 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                  We’re here to make your experience{" "}
                  <span className="text-yellow-400">better.</span>
                </h3>

                <p className="mt-5 max-w-md leading-7 text-gray-400">
                  Whether you need help with an order or simply want to share
                  your feedback, feel free to reach out to us.
                </p>

                {/* Contact items */}
                <div className="mt-9 space-y-4">
                  <a
                    href="tel:+923001234567"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-gray-900">
                      <Phone size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="mt-1 font-semibold text-white">
                        +92 300 1234567
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-400"
                    />
                  </a>

                  <a
                    href="mailto:support@foodcouriers.com"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-gray-900">
                      <Mail size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="mt-1 font-semibold text-white">
                        support@foodcouriers.com
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-400"
                    />
                  </a>

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-gray-900">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="mt-1 font-semibold text-white">
                        Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support time */}
                <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-6">
                  <Clock3 size={18} className="text-yellow-400" />

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Support available 24/7
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      We usually respond within a few minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div
              data-aos="fade-left"
              data-aos-delay="150"
              className="bg-white p-7 md:p-10 lg:p-12"
            >
              <div className="mb-7">
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Send us a message
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Fill out the form and our team will get back to you shortly.
                </p>
              </div>

              <form className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/10"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/10"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Message
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/10"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:text-gray-900 hover:shadow-yellow-400/20"
                >
                  Send Message

                  <Send
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
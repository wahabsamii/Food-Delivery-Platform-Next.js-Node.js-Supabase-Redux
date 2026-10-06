"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Mail,
  Phone,
  ArrowUpRight,
  Send,
  Utensils,
  Clock3,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Restaurants", href: "/restaurants" },
  { name: "Menu", href: "/menu" },
  { name: "Contact", href: "#contact" },
];

const supportLinks = [
  { name: "Help Center", href: "#faqs" },
  { name: "FAQs", href: "#faqs" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
];

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-gray-300">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Newsletter */}
        <div
          data-aos="fade-up"
          className="border-b border-white/10 py-16 md:py-20"
        >
          <div className="grid items-center gap-8 lg:grid-cols-2">

            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-yellow-400">
                <Mail size={14} />
                Stay Updated
              </span>

              <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Stay Hungry.{" "}
                <span className="text-yellow-400">
                  Stay Updated.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                Get delicious deals, exclusive offers, and the latest
                updates from FoodCouriers directly in your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <div
              data-aos="fade-left"
              data-aos-delay="150"
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
                  <Mail
                    size={19}
                    className="shrink-0 text-gray-500"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-gray-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20"
                >
                  Subscribe
                  <Send size={17} />
                </button>
              </div>

              <p className="mt-3 px-2 text-xs text-gray-600">
                No spam. Just delicious updates and exclusive offers.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div data-aos="fade-up">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-gray-950 shadow-lg shadow-yellow-400/10">
                <Utensils size={22} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Food<span className="text-yellow-400">Couriers</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-500">
              Your favorite food, delivered fresh, fast, and right to
              your doorstep. Discover great restaurants and enjoy every
              bite.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-yellow-400 hover:text-gray-950"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-yellow-400 hover:text-gray-950"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-yellow-400 hover:text-gray-950"
              >
                <FaTwitter size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors duration-300 hover:text-yellow-400"
                  >
                    <span className="h-px w-0 bg-yellow-400 transition-all duration-300 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              Support
            </h3>

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors duration-300 hover:text-yellow-400"
                  >
                    <span className="h-px w-0 bg-yellow-400 transition-all duration-300 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              Contact Us
            </h3>

            <div className="space-y-4">

              {/* Phone */}
              <a
                href="tel:+923001234567"
                className="group flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-gray-950">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Call Us
                  </p>
                  <p className="mt-1 text-sm text-gray-400 transition-colors group-hover:text-white">
                    +92 300 1234567
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@foodcouriers.com"
                className="group flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-gray-950">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Email Us
                  </p>
                  <p className="mt-1 break-all text-sm text-gray-400 transition-colors group-hover:text-white">
                    support@foodcouriers.com
                  </p>
                </div>
              </a>

              {/* Support */}
              <div className="group flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                  <Clock3 size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Support
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Available 24/7
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} FoodCouriers. All rights reserved.
            </p>

            <p className="flex items-center gap-1 text-xs text-gray-600">
              Designed & Developed by{" "}
              <Link
                href="https://wahabsami.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
              >
                Abdul Wahab
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
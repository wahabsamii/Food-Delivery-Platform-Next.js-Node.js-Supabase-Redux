"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  ShoppingCart,
  Heart,
  User,
  Utensils,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { likeProducts } = useSelector((state) => state.like);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Foods", href: "#foods" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-gray-950 shadow-sm transition-all duration-300 group-hover:rotate-[-5deg] group-hover:shadow-md group-hover:shadow-yellow-400/30">
            <Utensils size={22} strokeWidth={2.5} />
          </div>

          <div className="leading-none">
            <span className="text-xl font-extrabold tracking-tight text-gray-950 sm:text-2xl">
              Food<span className="text-yellow-500">Couriers</span>
            </span>

            <p className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:block">
              Fresh • Fast • Delicious
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-yellow-50 hover:text-gray-950"
            >
              {link.name}

              <span className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-yellow-400 transition-all duration-300 group-hover:w-5" />
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Favourite */}
          <Link
            href="/favourite"
            aria-label="Favourite products"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600"
          >
            <Heart
              size={20}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {likeProducts?.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 px-1 text-[10px] font-extrabold text-gray-950">
                {likeProducts.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600"
          >
            <ShoppingCart
              size={20}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {cartItems?.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 px-1 text-[10px] font-extrabold text-gray-950">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User / Login */}
          {currentUser ? (
            <Link
              href={
                currentUser.role === "user"
                  ? "/user/dashboard"
                  : "/admin/dashboard"
              }
              className="group flex h-11 items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-300 hover:bg-yellow-400 hover:text-gray-950"
            >
              <User
                size={19}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="hidden text-sm font-bold sm:block">
                Dashboard
              </span>

              <ChevronDown
                size={15}
                className="hidden sm:block"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="group flex h-11 items-center gap-2 rounded-xl bg-yellow-400 px-4 text-sm font-bold text-gray-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-md hover:shadow-yellow-400/20"
            >
              <User
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-gray-100 bg-white lg:hidden">
        <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2.5 scrollbar-hide sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition-colors duration-300 hover:bg-yellow-50 hover:text-gray-950"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
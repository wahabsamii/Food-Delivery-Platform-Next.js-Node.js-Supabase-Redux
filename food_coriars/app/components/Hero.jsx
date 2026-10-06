"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import img from "@/public/home-hero.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Star, ShoppingBag } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-yellow-400"
    >
      {/* Background Decorations */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-yellow-300/60 blur-3xl" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-yellow-300/70 blur-3xl" />

      <div className="absolute right-[35%] top-20 hidden h-4 w-4 rounded-full bg-black/20 lg:block" />
      <div className="absolute right-[28%] top-40 hidden h-2 w-2 rounded-full bg-black/20 lg:block" />

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">

        {/* LEFT CONTENT */}
        <div
          data-aos="fade-right"
          className="relative z-10 text-center lg:text-left"
        >
          {/* Small Badge */}
          <div
            data-aos="fade-down"
            data-aos-delay="100"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400">
              🍔
            </span>

            Fresh food, delivered with love
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
            Delicious food
            <span className="block">
              <span className="text-white drop-shadow-sm">
                delivered fast.
              </span>{" "}
              🚀
            </span>
          </h1>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-800 sm:text-lg lg:mx-0"
          >
            Discover your favorite meals from the best restaurants around
            you. Fresh, delicious and delivered straight to your doorstep.
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              href="/cart"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 font-bold text-white shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900"
            >
              Order Now

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-black transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border-2 border-black/80 bg-white/40 px-7 py-3.5 font-bold text-gray-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Explore Menu
            </Link>
          </div>

          {/* Trust Stats */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md">
                <Clock3 size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-950">
                  Fast Delivery
                </p>
                <p className="text-xs text-gray-700">
                  30 min or less
                </p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-black/20 sm:block" />

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md">
                <Star
                  size={20}
                  className="fill-yellow-400"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-950">
                  4.9 / 5 Rating
                </p>
                <p className="text-xs text-gray-700">
                  Loved by customers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          {/* Main Circle */}
          <div className="relative mx-auto flex aspect-square max-w-[520px] items-center justify-center rounded-full bg-white/25 p-5 shadow-2xl backdrop-blur-sm sm:p-8">
            
            {/* Inner Circle */}
            <div className="absolute inset-6 rounded-full border border-white/60 sm:inset-10" />

            {/* Food Image */}
            <div
              className="relative z-10 transition-transform duration-700 hover:scale-105"
            >
              <Image
                src={img}
                alt="Delicious food"
                priority
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>

            {/* Floating Rating Card */}
            <div
              data-aos="zoom-in"
              data-aos-delay="700"
              className="absolute left-0 top-16 z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:left-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                <Star
                  size={19}
                  className="fill-yellow-400 text-yellow-400"
                />
              </div>

              <div>
                <p className="text-sm font-black text-gray-950">
                  4.9
                </p>
                <p className="text-[11px] text-gray-500">
                  Customer Rating
                </p>
              </div>
            </div>

            {/* Floating Order Card */}
            <div
              data-aos="zoom-in"
              data-aos-delay="900"
              className="absolute bottom-12 right-0 z-20 flex items-center gap-3 rounded-2xl bg-black px-4 py-3 text-white shadow-2xl sm:right-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black">
                <ShoppingBag size={18} />
              </div>

              <div>
                <p className="text-sm font-bold">
                  2,500+
                </p>
                <p className="text-[11px] text-gray-400">
                  Orders delivered
                </p>
              </div>
            </div>

            {/* Small Decorative Circle */}
            <div className="absolute -bottom-2 left-1/4 h-5 w-5 rounded-full bg-black shadow-lg" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-white [clip-path:ellipse(65%_100%_at_50%_100%)]" />
    </section>
  );
};

export default Hero;
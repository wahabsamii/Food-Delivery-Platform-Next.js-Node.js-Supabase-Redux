"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Percent,
  Truck,
  Utensils,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const deals = [
  {
    title: "50% OFF",
    desc: "On all burgers today!",
    icon: Percent,
    label: "Limited Offer",
  },
  {
    title: "Free Delivery",
    desc: "Orders above $20",
    icon: Truck,
    label: "Save Delivery",
  },
  {
    title: "Combo Meals",
    desc: "Save more with combos",
    icon: Utensils,
    label: "Best Value",
  },
];

const Deals = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-yellow-400 py-20">

      {/* DECORATION */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/15" />

      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-black/5" />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div
          data-aos="fade-up"
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 text-gray-900 text-sm font-bold mb-4">
            <Sparkles size={16} />
            Today's Special Offers
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Delicious Deals,{" "}
            <span className="text-white">Better Prices</span>
          </h2>

          <p className="mt-3 text-gray-800/70 max-w-xl mx-auto">
            Grab your favorite meals and enjoy exclusive offers made just
            for you.
          </p>
        </div>

        {/* DEAL CARDS */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">

          {deals.map((deal, i) => {
            const Icon = deal.icon;

            return (
              <div
                key={deal.title}
                data-aos="fade-up"
                data-aos-delay={i * 120}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-white
                  rounded-[28px]
                  p-6 md:p-7
                  border border-white/50
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >

                {/* DECORATIVE CIRCLE */}
                <div
                  className="
                    absolute
                    -right-12
                    -top-12
                    w-36
                    h-36
                    rounded-full
                    bg-yellow-50
                    group-hover:bg-yellow-100
                    group-hover:scale-[2]
                    transition-all
                    duration-700
                  "
                />

                {/* TOP */}
                <div className="relative flex items-center justify-between">

                  {/* ICON */}
                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-yellow-50
                      text-yellow-500
                      flex items-center justify-center
                      group-hover:bg-yellow-400
                      group-hover:text-gray-900
                      group-hover:rotate-6
                      transition-all
                      duration-500
                    "
                  >
                    <Icon
                      size={27}
                      strokeWidth={2}
                    />
                  </div>

                  {/* LABEL */}
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {deal.label}
                  </span>

                </div>

                {/* CONTENT */}
                <div className="relative mt-6">

                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {deal.title}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    {deal.desc}
                  </p>

                </div>

                {/* CTA */}
                <button
                  className="
                    relative
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-gray-900
                    group-hover:text-yellow-600
                    transition-colors
                  "
                >
                  Grab Deal

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      w-8
                      h-8
                      rounded-full
                      bg-gray-100
                      group-hover:bg-yellow-400
                      group-hover:text-gray-900
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                    "
                  >
                    <ArrowRight size={15} />
                  </span>
                </button>

                {/* BOTTOM ACCENT */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-0
                    bg-yellow-400
                    group-hover:w-full
                    transition-all
                    duration-500
                  "
                />

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Deals;
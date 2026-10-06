"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Truck,
  Utensils,
  Star,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Get your favorite food delivered fresh and hot in under 30 minutes.",
  },
  {
    icon: Utensils,
    title: "Best Quality",
    desc: "We partner with top-rated restaurants and trusted chefs.",
  },
  {
    icon: Star,
    title: "Top Rated",
    desc: "Loved and trusted by thousands of happy customers every day.",
  },
];

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20">

      {/* BACKGROUND DECORATION */}
      <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-yellow-50" />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-yellow-50" />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* SECTION HEADER */}
        <div
          data-aos="fade-up"
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[3px] rounded-full bg-yellow-400" />

            <span className="text-sm font-bold uppercase tracking-wider text-yellow-600">
              Why Us
            </span>

            <span className="w-8 h-[3px] rounded-full bg-yellow-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Why Choose{" "}
            <span className="text-yellow-500">Us?</span>
          </h2>

          <p className="mt-3 text-gray-500">
            We make ordering your favorite food simple, fast, and enjoyable.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={i * 120}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-gray-50
                  rounded-[28px]
                  p-7
                  md:p-8
                  border border-gray-100
                  hover:bg-white
                  hover:border-yellow-200
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >

                {/* TOP DECORATION */}
                <div
                  className="
                    absolute
                    -top-10
                    -right-10
                    w-28
                    h-28
                    rounded-full
                    bg-yellow-50
                    group-hover:bg-yellow-100
                    group-hover:scale-[2]
                    transition-all
                    duration-700
                  "
                />

                {/* ICON */}
                <div className="relative flex items-center justify-between">

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-yellow-100
                      text-yellow-500
                      flex
                      items-center
                      justify-center
                      group-hover:bg-yellow-400
                      group-hover:text-gray-900
                      group-hover:rotate-6
                      group-hover:scale-105
                      transition-all
                      duration-500
                    "
                  >
                    <Icon size={30} strokeWidth={2} />
                  </div>

                  {/* ARROW */}
                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      bg-white
                      text-gray-300
                      flex
                      items-center
                      justify-center
                      shadow-sm
                      group-hover:bg-yellow-400
                      group-hover:text-gray-900
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                    "
                  >
                    <ArrowUpRight size={17} />
                  </div>

                </div>

                {/* CONTENT */}
                <div className="relative mt-7">

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {item.desc}
                  </p>

                </div>

                {/* BOTTOM LINE */}
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

export default WhyChooseUs;
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Pizza,
  Beef,
  CookingPot,
  CakeSlice,
  CupSoda,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Pizza",
    icon: Pizza,
    count: "120+ items",
  },
  {
    name: "Burger",
    icon: Beef,
    count: "95+ items",
  },
  {
    name: "Biryani",
    icon: CookingPot,
    count: "60+ items",
  },
  {
    name: "Dessert",
    icon: CakeSlice,
    count: "80+ items",
  },
  {
    name: "Drinks",
    icon: CupSoda,
    count: "40+ items",
  },
];

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div
          data-aos="fade-up"
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[3px] bg-yellow-400 rounded-full" />

              <span className="text-sm font-bold uppercase tracking-wider text-yellow-600">
                Food Categories
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Explore Our{" "}
              <span className="text-yellow-500">Categories</span>
            </h2>

            <p className="text-gray-500 mt-2 max-w-lg">
              Discover delicious meals, refreshing drinks and your favorite
              food all in one place.
            </p>
          </div>

          {/* VIEW ALL */}
          <button className="group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-yellow-600 transition">
            View All

            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm group-hover:bg-yellow-400 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight size={17} />
            </span>
          </button>
        </div>

        {/* CATEGORIES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;

            return (
              <button
                key={cat.name}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-white
                  rounded-[28px]
                  p-5 md:p-6
                  text-center
                  border border-gray-100
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >
                {/* Decorative Circle */}
                <div
                  className="
                    absolute
                    -top-16
                    -right-16
                    w-32
                    h-32
                    rounded-full
                    bg-yellow-400/10
                    group-hover:bg-yellow-400/20
                    group-hover:scale-[2.5]
                    transition-all
                    duration-700
                  "
                />

                {/* ICON */}
                <div
                  className="
                    relative
                    w-20
                    h-20
                    mx-auto
                    rounded-[24px]
                    bg-yellow-50
                    flex
                    items-center
                    justify-center
                    text-yellow-500
                    group-hover:bg-yellow-400
                    group-hover:text-gray-900
                    group-hover:rotate-3
                    group-hover:scale-105
                    transition-all
                    duration-500
                  "
                >
                  <Icon
                    size={38}
                    strokeWidth={1.8}
                  />
                </div>

                {/* NAME */}
                <h3 className="relative mt-5 font-bold text-gray-900 text-lg group-hover:text-yellow-600 transition">
                  {cat.name}
                </h3>

                {/* COUNT */}
                <p className="relative text-sm text-gray-500 mt-1">
                  {cat.count}
                </p>

                {/* ARROW */}
                <div
                  className="
                    relative
                    mt-4
                    mx-auto
                    flex
                    items-center
                    justify-center
                    w-8
                    h-8
                    rounded-full
                    bg-gray-50
                    text-gray-400
                    group-hover:bg-yellow-400
                    group-hover:text-gray-900
                    group-hover:translate-x-1
                    transition-all
                    duration-300
                  "
                >
                  <ArrowRight size={15} />
                </div>

                {/* BOTTOM ACCENT */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    -translate-x-1/2
                    w-0
                    h-1
                    bg-yellow-400
                    rounded-full
                    group-hover:w-16
                    transition-all
                    duration-500
                  "
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Star,
  Clock3,
  Bike,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

const restaurants = [
  {
    name: "Pizza Palace",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    cuisine: "Pizza • Italian",
    rating: "4.9",
    reviews: "2.4k",
    time: "20–30 min",
    price: "$$",
    badge: "Best Seller",
  },
  {
    name: "Burger Hub",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
    cuisine: "Burgers • Fast Food",
    rating: "4.8",
    reviews: "1.8k",
    time: "15–25 min",
    price: "$",
    badge: "Popular",
  },
  {
    name: "Biryani House",
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc",
    cuisine: "Biryani • Pakistani",
    rating: "4.9",
    reviews: "1.5k",
    time: "25–35 min",
    price: "$$",
    badge: "Top Rated",
  },
];

const TopRestaurants = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20">
      {/* Background decorations */}
      <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-yellow-100/60" />
      <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-yellow-50" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div
          data-aos="fade-up"
          className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-[3px] w-8 rounded-full bg-yellow-400" />

              <span className="text-sm font-bold uppercase tracking-wider text-yellow-600">
                Featured Restaurants
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Discover Our{" "}
              <span className="text-yellow-500">Top Restaurants</span>
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Explore the most loved restaurants near you and order your
              favorite meals with just a few clicks.
            </p>
          </div>

          <button className="group inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-sm transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400">
            View All
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </div>

        {/* Restaurant Cards */}
        <div className="grid gap-7 md:grid-cols-3">
          {restaurants.map((res, i) => (
            <div
              key={res.name}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-yellow-200 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={res.image}
                  alt={res.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-extrabold text-gray-900 shadow-lg">
                    {res.badge}
                  </span>
                </div>

                {/* Favorite / Arrow */}
                <button
                  aria-label={`View ${res.name}`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-yellow-400 hover:rotate-6"
                >
                  <ArrowUpRight size={18} />
                </button>

                {/* Restaurant name on image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-2xl font-extrabold">{res.name}</h3>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                    <MapPin size={14} />
                    <span>{res.cuisine}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1">
                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-yellow-500"
                      />
                      <span className="text-sm font-bold text-gray-900">
                        {res.rating}
                      </span>
                    </div>

                    <span className="text-sm text-gray-400">
                      ({res.reviews})
                    </span>
                  </div>

                  <span className="text-sm font-bold text-gray-400">
                    {res.price}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-5 flex items-center gap-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock3 size={16} className="text-yellow-500" />
                    {res.time}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Bike size={17} className="text-yellow-500" />
                    Delivery
                  </div>
                </div>

                {/* CTA */}
                <button className="group/btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900">
                  Explore Restaurant
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRestaurants;
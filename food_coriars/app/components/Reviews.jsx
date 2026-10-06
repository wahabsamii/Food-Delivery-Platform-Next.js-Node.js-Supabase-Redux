"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  BadgeCheck,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    name: "Ali Khan",
    role: "Regular Customer",
    avatar: "AK",
    text: "Best food app I have ever used! The UI is smooth and delivery is always on time.",
  },
  {
    name: "Sarah Ahmed",
    role: "Food Lover",
    avatar: "SA",
    text: "Fast delivery, great food quality, and amazing customer support. Everything feels so easy.",
  },
  {
    name: "John Doe",
    role: "Happy Customer",
    avatar: "JD",
    text: "Amazing experience every single time. The food is delicious and ordering takes seconds.",
  },
  {
    name: "Ayesha Noor",
    role: "Regular Customer",
    avatar: "AN",
    text: "So easy to use and the food arrives hot and fresh. Definitely one of my favorite food apps.",
  },
];

const Reviews = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-gray-50 py-20 md:py-24"
    >
      {/* Background decorations */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-yellow-100/60 blur-2xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-yellow-50 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">
            <Star size={15} fill="currentColor" />
            Customer Reviews
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            Loved by{" "}
            <span className="text-yellow-500">Thousands</span> of Food Lovers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Real experiences from customers who love delicious meals,
            lightning-fast delivery, and a simple ordering experience.
          </p>
        </div>

        {/* Reviews */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="relative"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop
            speed={700}
            spaceBetween={24}
            navigation={{
              prevEl: ".review-prev",
              nextEl: ".review-next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1100: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.name} className="h-auto">
                <div className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-yellow-200 hover:shadow-2xl md:p-8">
                  {/* Quote icon */}
                  <div className="absolute -right-3 -top-3 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-50 text-yellow-400 transition-all duration-500 group-hover:scale-125 group-hover:bg-yellow-100">
                    <Quote size={32} fill="currentColor" className="opacity-80" />
                  </div>

                  {/* Stars */}
                  <div className="relative flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        fill="currentColor"
                        className="text-yellow-400"
                      />
                    ))}

                    <span className="ml-2 text-xs font-semibold text-gray-400">
                      5.0
                    </span>
                  </div>

                  {/* Review */}
                  <div className="relative flex-1">
                    <p className="mt-6 text-[16px] leading-7 text-gray-600">
                      “{review.text}”
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gray-100" />

                  {/* User */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 font-extrabold text-gray-900 shadow-sm">
                        {review.avatar}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-gray-900">
                            {review.name}
                          </h4>

                          <BadgeCheck
                            size={16}
                            fill="currentColor"
                            className="text-yellow-500"
                          />
                        </div>

                        <p className="mt-0.5 text-xs text-gray-400">
                          {review.role}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-gray-300">
                      VERIFIED
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button
            type="button"
            aria-label="Previous review"
            className="review-prev absolute -left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-900 shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:shadow-xl md:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            aria-label="Next review"
            className="review-next absolute -right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-900 shadow-lg transition-all duration-300 hover:bg-yellow-400 hover:shadow-xl md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom trust stats */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm"
        >
          <div className="text-center">
            <p className="text-xl font-extrabold text-gray-900">4.9/5</p>
            <p className="text-xs text-gray-400">Average Rating</p>
          </div>

          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          <div className="text-center">
            <p className="text-xl font-extrabold text-gray-900">10K+</p>
            <p className="text-xs text-gray-400">Happy Customers</p>
          </div>

          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          <div className="text-center">
            <p className="text-xl font-extrabold text-gray-900">98%</p>
            <p className="text-xs text-gray-400">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
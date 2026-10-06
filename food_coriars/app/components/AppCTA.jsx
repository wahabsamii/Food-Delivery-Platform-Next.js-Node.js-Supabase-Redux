"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Smartphone,
  Download,
  Apple,
  Play,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const AppCTA = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-950 py-20 md:py-24">
      {/* Background decorations */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          {/* Yellow glow */}
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="grid items-center gap-12 px-6 py-12 md:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-16">
            {/* Content */}
            <div data-aos="fade-right" className="relative">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400">
                <Sparkles size={15} />
                Available on Android & iOS
              </div>

              <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                Your Favorite Food,
                <span className="block text-yellow-400">
                  Just One Tap Away.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
                Order delicious meals, discover top restaurants, track your
                delivery, and enjoy exclusive deals — all from our mobile app.
              </p>

              {/* Benefits */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Faster food ordering",
                  "Exclusive app deals",
                  "Live order tracking",
                  "Easy & secure checkout",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-yellow-400"
                    />
                    {item}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button className="group inline-flex items-center justify-center gap-3 rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-gray-900 shadow-lg shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-yellow-400/20">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/10">
                    <Play size={18} fill="currentColor" />
                  </div>

                  <div className="text-left">
                    <span className="block text-[10px] font-medium uppercase tracking-wider">
                      Get it on
                    </span>
                    <span className="block text-sm">Google Play</span>
                  </div>
                </button>

                <button className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Apple size={20} fill="currentColor" />
                  </div>

                  <div className="text-left">
                    <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Download on the
                    </span>
                    <span className="block text-sm">App Store</span>
                  </div>
                </button>
              </div>

              {/* Small stats */}
              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-xl font-extrabold text-white">10K+</p>
                  <p className="text-xs text-gray-500">Downloads</p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-xl font-extrabold text-white">4.9/5</p>
                  <p className="text-xs text-gray-500">App Rating</p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-xl font-extrabold text-white">24/7</p>
                  <p className="text-xs text-gray-500">Support</p>
                </div>
              </div>
            </div>

            {/* App visual */}
            <div
              data-aos="fade-left"
              data-aos-delay="150"
              className="relative flex min-h-[360px] items-center justify-center"
            >
              {/* Glow */}
              <div className="absolute h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />

              {/* Back phone */}
              <div className="absolute -mr-32 mt-10 h-[300px] w-[150px] rotate-12 rounded-[28px] border border-white/10 bg-gray-800 shadow-2xl opacity-50">
                <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-600" />
              </div>

              {/* Main phone */}
              <div className="relative z-10 h-[350px] w-[175px] -rotate-6 rounded-[32px] border-[6px] border-gray-800 bg-white shadow-2xl shadow-yellow-400/10">
                {/* Speaker */}
                <div className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

                {/* Fake app screen */}
                <div className="h-full overflow-hidden rounded-[26px] bg-gray-50">
                  <div className="bg-yellow-400 px-4 pb-5 pt-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-medium text-gray-800">
                          Good Evening
                        </p>
                        <p className="text-sm font-extrabold text-gray-900">
                          What are you craving?
                        </p>
                      </div>

                      <div className="h-8 w-8 rounded-full bg-white/60" />
                    </div>
                  </div>

                  <div className="space-y-3 p-3">
                    <div className="h-24 rounded-2xl bg-gray-200" />

                    <div className="flex gap-2">
                      <div className="h-14 flex-1 rounded-xl bg-yellow-100" />
                      <div className="h-14 flex-1 rounded-xl bg-gray-200" />
                    </div>

                    <div className="h-20 rounded-2xl bg-gray-200" />

                    <div className="flex items-center justify-between rounded-xl bg-white p-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-yellow-400" />
                        <div>
                          <div className="h-2 w-14 rounded bg-gray-200" />
                          <div className="mt-1 h-1.5 w-10 rounded bg-gray-100" />
                        </div>
                      </div>

                      <ArrowRight size={14} className="text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating download badge */}
              <div className="absolute bottom-8 left-4 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-gray-900/90 px-4 py-3 shadow-xl backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-gray-900">
                  <Download size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold text-white">
                    Download Now
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Free on both platforms
                  </p>
                </div>
              </div>

              {/* Floating icon */}
              <div className="absolute right-5 top-10 z-20 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/20">
                <Smartphone size={23} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppCTA;
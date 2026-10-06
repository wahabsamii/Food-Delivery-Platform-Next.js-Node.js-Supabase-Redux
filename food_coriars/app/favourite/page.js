
"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FiShoppingCart,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "../redux/cart/cartSlice";
import { removeLike } from "../redux/like/likeSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LikesPage = () => {
  const dispatch = useDispatch();

  const { likeProducts } = useSelector((state) => state.like);

  const handleAddToCart = (food) => {
    dispatch(addToCart(food));
  };

  const handleRemoveLike = (id) => {
    dispatch(removeLike(id));
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
                  <FaHeart />
                </div>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                  {likeProducts?.length || 0} Saved
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Your Favorites
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Your favorite foods, all in one place.
              </p>
            </div>
          </div>

          {/* Empty State */}
          {likeProducts.length === 0 ? (
            <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white px-6 text-center shadow-sm">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-400">
                <FiHeart size={42} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                No favorites yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                You haven't saved any foods yet. Explore our delicious
                menu and tap the heart icon to save your favorites.
              </p>

              <a
                href="/user/foods"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-md"
              >
                Explore Foods
                <FiArrowRight />
              </a>
            </div>
          ) : (
            <>
              {/* Products */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {likeProducts.map((food) => (
                  <div
                    key={food.id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-gray-100">

                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Favorite */}
                      <button
                        type="button"
                        onClick={() => handleRemoveLike(food.id)}
                        aria-label={`Remove ${food.name} from favorites`}
                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-md backdrop-blur-sm transition hover:scale-110 hover:bg-red-50"
                      >
                        <FaHeart size={16} />
                      </button>

                      {/* Category */}
                      {food.category && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
                          {food.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">

                      <h3 className="truncate text-lg font-bold text-gray-900">
                        {food.name}
                      </h3>

                      {food.description && (
                        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                          {food.description}
                        </p>
                      )}

                      {/* Bottom */}
                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                        <div>
                          <p className="text-xs font-medium text-gray-400">
                            Price
                          </p>

                          <span className="text-xl font-bold text-yellow-500">
                            ${Number(food.price).toFixed(2)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(food)}
                          className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-sm transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:shadow-md"
                          aria-label={`Add ${food.name} to cart`}
                        >
                          <FiShoppingCart size={19} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Info */}
              <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-yellow-400 p-6 text-center sm:flex-row sm:text-left">
                <div>
                  <h3 className="font-bold text-gray-900">
                    Found something you love?
                  </h3>

                  <p className="mt-1 text-sm text-black/60">
                    Add your favorite meals to the cart and place your order.
                  </p>
                </div>

                <a
                  href="/user/foods"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  Browse More
                  <FiArrowRight />
                </a>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LikesPage;
"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowRight,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "./../redux/cart/cartSlice";
import serverUrl from "@/config/server";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = 3;
  const total = subtotal + deliveryFee;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // PLACE ORDER
  const placeOrder = async () => {
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first");
      }

      const payload = {
        items: cartItems.map((item) => ({
          item_id: item.id,
          quantity: item.quantity,
        })),
      };

      await axios.post(
        `${serverUrl}/api/orders`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(clearCart());

      toast.success("Order placed successfully!");
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <>
        <Header />

        <main className="min-h-[70vh] bg-gray-50 px-4 py-16">
          <div className="mx-auto flex min-h-[500px] max-w-5xl items-center justify-center">
            <div className="w-full rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                <FaShoppingBag size={38} />
              </div>

              <h1 className="mt-6 text-3xl font-bold text-gray-900">
                Your Cart is Empty
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                Looks like you haven't added anything to your cart yet.
                Explore our delicious menu and find something you'll love.
              </p>

              <a
                href="/user/foods"
                className="mx-auto mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-lg"
              >
                Browse Foods
                <FaArrowRight size={13} />
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">

          {/* PAGE HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                <FaShoppingBag />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Your Cart
                </h1>

                <p className="text-sm text-gray-500">
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">

            {/* ================= CART ITEMS ================= */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Cart Items
                </h2>

                <button
                  type="button"
                  onClick={() => dispatch(clearCart())}
                  className="text-xs font-semibold text-red-500 transition hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5"
                  >
                    <div className="flex gap-4">

                      {/* IMAGE */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                              {item.name}
                            </h3>

                            {item.category && (
                              <p className="mt-1 text-xs text-gray-400">
                                {item.category}
                              </p>
                            )}
                          </div>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(removeFromCart(item.id))
                            }
                            aria-label={`Remove ${item.name}`}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <FaTrash size={13} />
                          </button>
                        </div>

                        {/* PRICE + QUANTITY */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                          <div>
                            <p className="text-xs text-gray-400">
                              Price
                            </p>

                            <p className="font-bold text-yellow-500">
                              ${Number(item.price).toFixed(2)}
                            </p>
                          </div>

                          {/* QUANTITY */}
                          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">

                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  decreaseQuantity(item.id)
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white hover:text-black"
                            >
                              <FaMinus size={10} />
                            </button>

                            <span className="min-w-[34px] text-center text-sm font-bold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                dispatch(addToCart(item))
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-black transition hover:bg-yellow-300"
                            >
                              <FaPlus size={10} />
                            </button>

                          </div>

                          {/* ITEM TOTAL */}
                          <div className="hidden text-right sm:block">
                            <p className="text-xs text-gray-400">
                              Total
                            </p>

                            <p className="font-bold text-gray-900">
                              $
                              {(
                                Number(item.price) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* MOBILE TOTAL */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:hidden">
                      <span className="text-xs text-gray-400">
                        Item Total
                      </span>

                      <span className="font-bold text-gray-900">
                        $
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= ORDER SUMMARY ================= */}
            <aside className="lg:sticky lg:top-24">

              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                {/* SUMMARY HEADER */}
                <div className="border-b border-gray-100 px-6 py-5">
                  <h2 className="text-lg font-bold text-gray-900">
                    Order Summary
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Review your order before checkout
                  </p>
                </div>

                <div className="p-6">

                  {/* SUBTOTAL */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-semibold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* DELIVERY */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaTruck className="text-gray-400" size={13} />

                      <span className="text-sm text-gray-500">
                        Delivery
                      </span>
                    </div>

                    <span className="font-semibold text-gray-900">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  {/* DIVIDER */}
                  <div className="my-5 border-t border-dashed border-gray-200" />

                  {/* TOTAL */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">
                        Total
                      </p>

                      <p className="text-xs text-gray-400">
                        Including delivery
                      </p>
                    </div>

                    <span className="text-2xl font-bold text-yellow-500">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* ERROR */}
                  {error && (
                    <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-3">
                      <p className="text-xs font-medium leading-5 text-red-600">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* PLACE ORDER */}
                  <button
                    type="button"
                    onClick={placeOrder}
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3.5 text-sm font-bold text-black shadow-sm transition hover:bg-yellow-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-700/30 border-t-black" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Place Order
                        <FaArrowRight size={12} />
                      </>
                    )}
                  </button>

                  {/* SECURITY */}
                  <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
                    <FaShieldAlt />
                    Secure and protected checkout
                  </div>
                </div>
              </div>

              {/* DELIVERY INFO */}
              <div className="mt-4 rounded-2xl bg-yellow-50 p-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-black">
                    <FaTruck size={14} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Fast Delivery
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Your delicious food will be prepared and
                      delivered as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
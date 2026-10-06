"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaClipboardList,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaUtensils,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import { serverUrl } from "../../lib/api";

function UserStatCard({ title, value, icon, description }) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h3>

          {description && (
            <p className="mt-1 text-xs text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-500 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ title, desc, href, icon }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl bg-yellow-400 p-5 text-black shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/10">
          {icon}
        </div>

        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-0.5 text-sm text-black/60">{desc}</p>
        </div>
      </div>

      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function getStatusStyle(status) {
  const normalizedStatus = status?.toLowerCase();

  if (
    normalizedStatus === "delivered" ||
    normalizedStatus === "completed"
  ) {
    return "bg-green-100 text-green-700";
  }

  if (
    normalizedStatus === "cancelled" ||
    normalizedStatus === "canceled"
  ) {
    return "bg-red-100 text-red-600";
  }

  if (
    normalizedStatus === "on the way" ||
    normalizedStatus === "out for delivery"
  ) {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-yellow-100 text-yellow-700";
}

function getStatusIcon(status) {
  const normalizedStatus = status?.toLowerCase();

  if (
    normalizedStatus === "delivered" ||
    normalizedStatus === "completed"
  ) {
    return <FaCheckCircle />;
  }

  return <FaClock />;
}

export default function UserDashboardPage() {
  const { likeProducts } = useSelector((state) => state.like);
  const { cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${serverUrl}/api/orders/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load your orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-yellow-600">
              User Dashboard
            </p>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Welcome back,{" "}
              <span className="text-yellow-500">
                {currentUser?.name || "User"} 👋
              </span>
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Here’s what’s happening with your orders today.
            </p>
          </div>

          <Link
            href="/user/foods"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black shadow-sm transition hover:bg-yellow-300 hover:shadow-md"
          >
            <FaUtensils />
            Order Food
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <UserStatCard
            title="My Orders"
            value={orders.length}
            description="Total orders placed"
            icon={<FaShoppingBag size={20} />}
          />

          <UserStatCard
            title="Favorites"
            value={likeProducts?.length || 0}
            description="Saved favorite foods"
            icon={<FaHeart size={20} />}
          />

          <UserStatCard
            title="Cart Items"
            value={cartItems?.length || 0}
            description="Items waiting in cart"
            icon={<FaClipboardList size={20} />}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <QuickAction
            title="Explore Foods"
            desc="Discover something delicious"
            href="/user/foods"
            icon={<FaUtensils />}
          />

          <QuickAction
            title="View My Orders"
            desc="Track your recent orders"
            href="/user/orders"
            icon={<FaShoppingBag />}
          />
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest food orders
              </p>
            </div>

            <Link
              href="/user/orders"
              className="flex items-center gap-2 text-sm font-semibold text-yellow-600 transition hover:text-yellow-700"
            >
              View All
              <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center px-6 py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-yellow-400" />

                <p className="mt-4 text-sm text-gray-500">
                  Loading your orders...
                </p>
              </div>
            )}

            {/* Empty */}
            {!loading && recentOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                  <FaShoppingBag size={24} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  No orders yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-gray-500">
                  You haven't placed any orders yet. Explore our foods
                  and order something delicious.
                </p>

                <Link
                  href="/user/foods"
                  className="mt-5 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
                >
                  Browse Foods
                </Link>
              </div>
            )}

            {/* Desktop Table */}
            {!loading && recentOrders.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">
                  <thead className="border-b border-gray-100 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-500">
                        Order
                      </th>

                      <th className="px-6 py-4 text-left font-semibold text-gray-500">
                        Items
                      </th>

                      <th className="px-6 py-4 text-left font-semibold text-gray-500">
                        Total
                      </th>

                      <th className="px-6 py-4 text-left font-semibold text-gray-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right font-semibold text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order, index) => {
                      const status =
                        order.status ||
                        order.orderStatus ||
                        "Pending";

                      const orderId =
                        order.id ||
                        order._id ||
                        `ORD-${index + 1}`;

                      const items =
                        order.items ||
                        order.order_items ||
                        [];

                      return (
                        <tr
                          key={orderId}
                          className="border-b border-gray-100 last:border-0 transition hover:bg-yellow-50/40"
                        >
                          {/* Order ID */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                                <FaShoppingBag />
                              </div>

                              <div>
                                <p className="font-bold text-gray-900">
                                  #
                                  {String(orderId).slice(-8)}
                                </p>

                                {order.created_at && (
                                  <p className="text-xs text-gray-400">
                                    {new Date(
                                      order.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Items */}
                          <td className="px-6 py-4">
                            {Array.isArray(items) ? (
                              <div className="flex flex-wrap gap-1">
                                {items.length > 0 ? (
                                  items.slice(0, 2).map((item, i) => (
                                    <span
                                      key={i}
                                      className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                                    >
                                      {item.name ||
                                        item.food_name ||
                                        item.title ||
                                        "Food"}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-gray-400">
                                    Food items
                                  </span>
                                )}

                                {items.length > 2 && (
                                  <span className="rounded-lg bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                                    +{items.length - 2}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-600">
                                {items || "Food items"}
                              </span>
                            )}
                          </td>

                          {/* Total */}
                          <td className="px-6 py-4">
                            <span className="font-bold text-gray-900">
                              $
                              {Number(
                                order.total ||
                                  order.total_amount ||
                                  order.amount ||
                                  0
                              ).toFixed(2)}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                                status
                              )}`}
                            >
                              {getStatusIcon(status)}
                              {status}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="px-6 py-4 text-right">
                            <Link
                              href="/user/orders"
                              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-gray-600 transition hover:bg-gray-100 hover:text-black"
                            >
                              View
                              <FaArrowRight size={10} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
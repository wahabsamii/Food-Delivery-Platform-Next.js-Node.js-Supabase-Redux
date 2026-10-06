"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaEye,
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";
import Link from "next/link";
import { serverUrl } from "../../lib/api";

function getStatusStyle(status) {
  switch (status?.toLowerCase()) {
    case "delivered":
    case "completed":
      return "bg-green-100 text-green-700";

    case "cancelled":
    case "canceled":
      return "bg-red-100 text-red-700";

    case "on the way":
    case "out for delivery":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function getStatusIcon(status) {
  switch (status?.toLowerCase()) {
    case "delivered":
    case "completed":
      return <FaCheckCircle />;

    case "cancelled":
    case "canceled":
      return <FaTimesCircle />;

    default:
      return <FaClock />;
  }
}

function Page() {
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
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                <FaShoppingBag />
              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                {orders.length} Orders
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and track all your food orders.
            </p>
          </div>

          {/* Refresh */}
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSyncAlt
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Orders Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center px-6 py-20">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-yellow-400" />

              <p className="mt-4 text-sm text-gray-500">
                Loading your orders...
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading && orders.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                <FaShoppingBag size={25} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                No orders found
              </h2>

              <p className="mt-1 max-w-md text-sm text-gray-500">
                You haven't placed any orders yet. Browse our foods
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

          {/* Table */}
          {!loading && orders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-[850px] w-full text-sm">

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
                      Created At
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
                  {orders.map((order) => {
                    const status = order.status || "Pending";

                    return (
                      <tr
                        key={order.id}
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
                                #{order.order_id}
                              </p>

                              <p className="text-xs text-gray-400">
                                Order
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Items */}
                        <td className="px-6 py-4">
                          <div className="flex max-w-[300px] flex-wrap gap-1.5">
                            {order.items?.length > 0 ? (
                              order.items.map((item, index) => (
                                <span
                                  key={index}
                                  className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                                >
                                  {item.item_name}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">
                                No items
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900">
                            ${Number(order.total).toFixed(2)}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-700">
                              {new Date(
                                order.created_at
                              ).toLocaleDateString()}
                            </p>

                            <p className="text-xs text-gray-400">
                              {new Date(
                                order.created_at
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
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
                            href={`/user/orders/${order.id}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-xs font-bold text-black transition hover:bg-yellow-300"
                          >
                            <FaEye />
                            View
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
  );
}

export default Page;
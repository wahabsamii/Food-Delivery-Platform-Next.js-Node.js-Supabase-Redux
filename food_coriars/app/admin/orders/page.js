
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaShoppingCart,
  FaSyncAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { serverUrl } from "../../lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${serverUrl}/api/orders/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
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
    <div className="min-h-screen">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Orders
            </h1>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
              {orders.length} Total
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Manage and monitor all orders placed by your customers.
          </p>
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaSyncAlt
            size={14}
            className={loading ? "animate-spin" : ""}
          />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>

          <button
            type="button"
            onClick={fetchOrders}
            className="font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <FaSyncAlt
            className="mx-auto animate-spin text-yellow-500"
            size={28}
          />

          <p className="mt-4 font-semibold text-gray-700">
            Loading orders...
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Please wait while we fetch the latest orders.
          </p>
        </div>
      ) : orders.length === 0 ? (

        /* Empty State */
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <FaShoppingCart size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            No orders found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            There are currently no orders placed by your customers.
            New orders will appear here.
          </p>

        </div>

      ) : (

        /* Orders Table */
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="font-bold text-gray-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Latest customer orders
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
              <FaShoppingCart />
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">

            <table className="min-w-[900px] w-full">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Order ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Items
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="transition hover:bg-yellow-50/40"
                  >

                    {/* Order ID */}
                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                        #{order.order_id}
                      </span>
                    </td>

                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-700">
                          {order.user_name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <span className="font-semibold text-gray-800">
                          {order.user_name}
                        </span>

                      </div>
                    </td>

                    {/* Items */}
                    <td className="max-w-xs px-6 py-5">
                      <div className="flex flex-wrap gap-1.5">

                        {order.items?.map((item, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                          >
                            {item.item_name}
                          </span>
                        ))}

                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-900">
                        ${order.total}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt
                          size={13}
                          className="text-gray-400"
                        />

                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </div>

                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(
                          order.created_at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">

                      <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-yellow-400 px-3.5 py-2 text-xs font-bold text-gray-900 transition hover:bg-yellow-500 hover:shadow-md"
                      >
                        <FaEye size={13} />
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </div>
      )}

    </div>
  );
}

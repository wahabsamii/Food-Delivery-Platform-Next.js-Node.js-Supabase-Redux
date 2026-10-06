
"use client";

import { useEffect, useState } from "react";
import { StatCard } from "../StatCard";

import {
  FaShoppingCart,
  FaUtensils,
  FaDollarSign,
  FaUsers,
  FaSyncAlt,
  FaArrowUp,
} from "react-icons/fa";

import axios from "axios";
import { serverUrl } from "../../lib/api";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const [ordersResponse, foodsResponse, usersResponse] =
        await Promise.all([
          axios.get(`${serverUrl}/api/orders/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          axios.get(`${serverUrl}/api/foods`),

          axios.get(`${serverUrl}/api/users`),
        ]);

      setOrders(ordersResponse.data);
      setFoods(foodsResponse.data);
      setUsers(usersResponse.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Dashboard
            </h1>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
              Admin
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Here's an overview of your food app.
          </p>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={fetchDashboardData}
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
        <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>{error}</span>

          <button
            type="button"
            onClick={fetchDashboardData}
            className="font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Orders"
          value={loading ? "..." : orders.length}
          icon={<FaShoppingCart size={21} />}
          trend="+12%"
        />

        <StatCard
          title="Total Foods"
          value={loading ? "..." : foods.length}
          icon={<FaUtensils size={21} />}
          trend="+5%"
        />

        <StatCard
          title="Revenue"
          value={loading ? "..." : "$12,540"}
          icon={<FaDollarSign size={21} />}
          trend="+18%"
        />

        <StatCard
          title="Total Users"
          value={loading ? "..." : users.length}
          icon={<FaUsers size={21} />}
          trend="+9%"
        />

      </div>

      {/* Bottom Content */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Performance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Performance Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your business performance this month
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">
              <FaArrowUp size={10} />
              18.4%
            </div>
          </div>

          {/* Chart */}
          <div className="flex h-48 items-end gap-3 border-b border-gray-100 px-2">

            {[45, 65, 52, 78, 60, 88, 72, 95, 75, 85, 68, 92].map(
              (height, index) => (
                <div
                  key={index}
                  className="group flex h-full flex-1 items-end"
                >
                  <div
                    className="w-full rounded-t-lg bg-yellow-400 transition-all duration-300 group-hover:bg-yellow-500"
                    style={{ height: `${height}%` }}
                  />
                </div>
              )
            )}

          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>

        </div>

        {/* Quick Summary */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-900">
            Quick Summary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current platform statistics
          </p>

          <div className="mt-6 space-y-5">

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Orders
              </span>

              <span className="font-bold text-gray-900">
                {loading ? "..." : orders.length}
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Available Foods
              </span>

              <span className="font-bold text-gray-900">
                {loading ? "..." : foods.length}
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Registered Users
              </span>

              <span className="font-bold text-gray-900">
                {loading ? "..." : users.length}
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Growth
              </span>

              <span className="font-bold text-green-500">
                +18.4%
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

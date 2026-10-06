
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { serverUrl } from "../../lib/api";

export default function FoodsPage() {
  const router = useRouter();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/foods`);
        setFoods(res.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load foods"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${serverUrl}/api/foods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success("Product Deleted");

        setFoods((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete product"
      );
    }
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Foods
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your food products and menu items
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/add-food")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          Add Food <span className="ml-1">+</span>
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && foods.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No foods found
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Start by adding your first food item.
          </p>

          <button
            onClick={() => router.push("/admin/add-food")}
            className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2.5 rounded-xl transition"
          >
            Add Food
          </button>
        </div>
      )}

      {/* FOOD GRID */}
      {!loading && foods.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* CATEGORY */}
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">
                  {item.description}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">
                      Price
                    </p>

                    <span className="text-xl font-bold text-yellow-500">
                      ${item.price}
                    </span>
                  </div>

                  {/* DISABLED DELETE */}
                  <button
                    disabled
                    title='This feature is currently disabled by admin'
                    className="bg-gray-100 text-gray-400 px-4 py-2 rounded-full text-sm font-medium cursor-not-allowed"
                    
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
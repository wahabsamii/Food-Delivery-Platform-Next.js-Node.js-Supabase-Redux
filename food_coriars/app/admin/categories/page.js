"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaTrash,
  FaTags,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";
import { serverUrl } from "../../lib/api";

export default function Page() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [allcat, setAllCats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setFetching(true);

      const res = await axios.get(
        `${serverUrl}/api/category`
      );

      setAllCats(res.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch categories"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${serverUrl}/api/category`,
        {
          name: name.trim(),
        }
      );

      toast.success("Category added successfully");

      setName("");
      setShowForm(false);

      fetchCategories();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to add category"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await axios.delete(
        `${serverUrl}/api/category/${id}`
      );

      toast.success("Category deleted successfully");

      setAllCats((prev) =>
        prev.filter((cat) => cat.id !== id)
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Categories
            </h1>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
              {allcat.length} Total
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Create and manage categories for your food menu.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Refresh */}
          <button
            type="button"
            onClick={fetchCategories}
            disabled={fetching}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSyncAlt
              size={13}
              className={fetching ? "animate-spin" : ""}
            />

            Refresh
          </button>

          {/* Add Category */}
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-sm transition hover:bg-yellow-500 hover:shadow-md"
          >
            {showForm ? (
              <FaTimes size={14} />
            ) : (
              <FaPlus size={14} />
            )}

            {showForm ? "Close" : "Add Category"}
          </button>
        </div>
      </div>

      {/* ================= ADD FORM ================= */}
      {showForm && (
        <div className="mb-7 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Form Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
              <FaTags size={18} />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Create New Category
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Add a category to organize your food items.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 sm:flex-row"
          >
            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category Name
              </label>

              <input
                type="text"
                placeholder="e.g. Burgers, Pizza, Drinks..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="flex h-[46px] min-w-[130px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <FaSyncAlt
                      size={13}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaPlus size={13} />
                    Save
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= CATEGORY CARD ================= */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>
            <h2 className="font-bold text-gray-900">
              Food Categories
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              All categories currently available in your menu.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
            <FaTags />
          </div>
        </div>

        {/* ================= LOADING ================= */}
        {fetching ? (
          <div className="px-6 py-16 text-center">

            <FaSyncAlt
              size={27}
              className="mx-auto animate-spin text-yellow-500"
            />

            <p className="mt-4 font-semibold text-gray-700">
              Loading categories...
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Please wait while we fetch your categories.
            </p>
          </div>
        ) : allcat.length === 0 ? (

          /* ================= EMPTY ================= */
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <FaTags size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No categories found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              You haven't created any food categories yet.
              Add your first category to start organizing
              your menu.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-yellow-500"
            >
              <FaPlus size={13} />
              Add First Category
            </button>
          </div>
        ) : (

          /* ================= TABLE ================= */
          <div className="overflow-x-auto">

            <table className="min-w-[650px] w-full">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">

                  <th className="w-20 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Category Name
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {allcat.map((item, index) => (

                  <tr
                    key={item.id}
                    className="group transition hover:bg-yellow-50/40"
                  >

                    {/* Number */}
                    <td className="px-6 py-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 transition group-hover:bg-yellow-100 group-hover:text-yellow-700">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                          <FaTags size={15} />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            Food category
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Delete */}
                    <td className="px-6 py-5 text-right">

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        // disabled={deletingId === item.id}
                        disabled
                        title='this feature is disabled for now'
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-500 transition hover:border-red-200 hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        {deletingId === item.id ? (
                          <>
                            <FaSyncAlt
                              size={12}
                              className="animate-spin"
                            />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <FaTrash size={12} />
                            Delete
                          </>
                        )}

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>
    </div>
  );
}
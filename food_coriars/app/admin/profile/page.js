"use client";

import { useEffect, useState } from "react";
import {
  FaUserEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaCheckCircle,
  FaSyncAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/user/userSlice";
import { serverUrl } from "../../lib/api";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state) => state.auth
  );

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Initialize form with Redux user
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile
  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${serverUrl}/api/users/profile`,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateUser(res.data.user));

      toast.success("Profile updated successfully");

      setIsEditing(false);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }

    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <FaSyncAlt
            size={26}
            className="mx-auto animate-spin text-yellow-500"
          />

          <p className="mt-4 text-sm font-semibold text-gray-600">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  const userInitial =
    currentUser.name?.charAt(0)?.toUpperCase() || "U";

  const role =
    currentUser.role?.toLowerCase() || "user";

  return (
    <div className="min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Profile
            </h1>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold capitalize text-green-700">
              {role}
            </span>

          </div>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account information and profile details.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-sm transition hover:bg-yellow-500 hover:shadow-md"
          >
            <FaUserEdit size={14} />
            Edit Profile
          </button>
        )}
      </div>

      {/* ================= PROFILE LAYOUT ================= */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

        {/* ================= USER CARD ================= */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Yellow top section */}
          <div className="h-24 bg-yellow-400" />

          <div className="-mt-12 px-6 pb-7 text-center">

            {/* Avatar */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-3xl font-extrabold text-yellow-400 shadow-lg">
              {userInitial}
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {currentUser.name}
            </h2>

            <p className="mt-1 break-all text-sm text-gray-500">
              {currentUser.email}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold capitalize text-green-700">
              <FaCheckCircle size={11} />
              {role} account
            </span>

            {/* User summary */}
            <div className="mt-7 border-t border-gray-100 pt-6 text-left">

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                  <FaShieldAlt size={14} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Account Type
                  </p>

                  <p className="text-sm font-semibold capitalize text-gray-800">
                    {role}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                  <FaEnvelope size={14} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400">
                    Email Address
                  </p>

                  <p className="truncate text-sm font-semibold text-gray-800">
                    {currentUser.email}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= DETAILS CARD ================= */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

            <div>
              <h2 className="font-bold text-gray-900">
                Account Details
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Update your personal account information.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
              <FaUser />
            </div>

          </div>

          {/* Form */}
          <div className="space-y-6 p-6">

            {/* Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaUser
                  size={12}
                  className="text-yellow-500"
                />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your name"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  isEditing
                    ? "border-gray-200 bg-white text-gray-900 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-500"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaEnvelope
                  size={12}
                  className="text-yellow-500"
                />
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your email"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  isEditing
                    ? "border-gray-200 bg-white text-gray-900 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-500"
                }`}
              />
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaShieldAlt
                  size={12}
                  className="text-yellow-500"
                />
                Account Role
              </label>

              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">

                <span className="text-sm font-semibold capitalize text-gray-600">
                  {role}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Protected
                </span>

              </div>
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaTimes size={13} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
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
                      <FaSave size={13} />
                      Save Changes
                    </>
                  )}
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
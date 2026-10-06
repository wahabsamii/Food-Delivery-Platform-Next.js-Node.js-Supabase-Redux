
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
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/user/userSlice";
import { serverUrl } from "../../lib/api";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${serverUrl}/api/users/profile`,
        formData,
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
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
    });

    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-yellow-400" />
      </div>
    );
  }

  const userInitial =
    currentUser.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-sm font-semibold text-yellow-600">
              Account Settings
            </p>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your personal information and account details.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black shadow-sm transition hover:bg-yellow-300 hover:shadow-md"
            >
              <FaUserEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">

          {/* Profile Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* Yellow Cover */}
            <div className="h-28 bg-yellow-400" />

            <div className="px-6 pb-6">

              {/* Avatar */}
              <div className="-mt-12 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-black text-3xl font-bold text-yellow-400 shadow-lg">
                  {userInitial}
                </div>
              </div>

              {/* User Info */}
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentUser.name}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {currentUser.email}
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold capitalize text-yellow-700">
                  <FaShieldAlt size={10} />
                  {currentUser.role}
                </span>
              </div>

              {/* Account Status */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Account Status
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                    <FaCheckCircle size={13} />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* Card Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5 md:px-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                <FaUser />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="text-xs text-gray-500">
                  Update your account information
                </p>
              </div>
            </div>

            <div className="space-y-6 p-6 md:p-8">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your name"
                    className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm outline-none transition ${
                      isEditing
                        ? "border-gray-200 bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                        : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your email"
                    className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm outline-none transition ${
                      isEditing
                        ? "border-gray-200 bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                        : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Account Role
                </label>

                <div className="relative">
                  <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={currentUser.role || "user"}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-sm capitalize text-gray-600 outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              {isEditing && (
                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaTimes />
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-white" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Changes
                      </>
                    )}
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
          <div className="flex gap-3">
            <FaShieldAlt className="mt-0.5 text-yellow-600" />

            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Your account is secure
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                Keep your account information up to date so we can
                provide you with the best food delivery experience.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserShield, FaUser } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import serverUrl from "@/config/server";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  // Demo login buttons
  const handleAdminLogin = () => {
    setFormData({
      email: "admin@gmail.com",
      password: "admin",
    });
    setError("");
  };

  const handleUserLogin = () => {
    setFormData({
      email: "jhonsmith1@gmail.com",
      password: "jhonsmith",
    });
    setError("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${serverUrl}/api/users/login`,
        formData
      );

      dispatch(signInSuccess(response.data.user));

      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful!");

      router.push(
        response.data.user.role === "user"
          ? "/user/dashboard"
          : "/admin/dashboard"
      );
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Connection to server failed";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <HiOutlineMail size={20} />
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <HiOutlineLockClosed size={20} />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-12 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <BiLoaderAlt className="animate-spin" size={24} />
            ) : (
              "Login"
            )}
          </button>

          {/* Demo Login Buttons */}
          <div className="pt-2">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">
                QUICK LOGIN
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">

              {/* Admin */}
              <button
                type="button"
                onClick={handleAdminLogin}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
              >
                <FaUserShield />
                Admin Login
              </button>

              {/* User */}
              <button
                type="button"
                onClick={handleUserLogin}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
              >
                <FaUser />
                User Login
              </button>

            </div>
          </div>

          {/* Register */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-yellow-500 hover:text-yellow-600"
              href="/register"
            >
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;

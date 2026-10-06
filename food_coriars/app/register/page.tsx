"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineUser } from 'react-icons/hi';
import { BiLoaderAlt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import serverUrl from '@/config/server';
const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // 1. Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Axios POST request to your Node.js backend
      const response = await axios.post(`${serverUrl}/api/users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful!");
        router.push('/login'); // Redirect to login page
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Registration failed. Try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">Join Food Couriers today</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <HiOutlineUser size={20} />
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <HiOutlineMail size={20} />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <HiOutlineLockClosed size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-12 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              >
                {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <HiOutlineLockClosed size={20} />
              </span>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-yellow-500 py-3 font-semibold text-white transition-all hover:bg-yellow-600 active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? <BiLoaderAlt className="animate-spin" size={24} /> : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-bold text-yellow-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
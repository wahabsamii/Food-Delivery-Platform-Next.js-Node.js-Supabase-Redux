
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  FaTachometerAlt,
  FaUtensils,
  FaShoppingCart,
  FaUsers,
  FaTags,
  FaUser,
} from "react-icons/fa";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { signOutSuccess } from "../redux/user/userSlice";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const menu = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      href: "/admin/foods",
      label: "Foods",
      icon: <FaUtensils />,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: <FaShoppingCart />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <FaUsers />,
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: <FaTags />,
    },
    {
      href: "/admin/profile",
      label: "Profile",
      icon: <FaUser />,
    },
  ];

  const handleLogout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#111827] text-white shadow-2xl">

      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-6">
        <Link href="/admin/dashboard" className="flex items-center gap-3">

         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg font-extrabold text-black">
            F
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              FoodCouriers
            </h1>

            <p className="text-xs font-medium text-gray-400">
              Admin Panel
            </p>
          </div>

        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">

        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Main Menu
        </p>

        <nav className="space-y-1.5">
          {menu.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/10"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`flex w-5 justify-center text-lg transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>

                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-gray-900" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 p-4">

        {/* Admin Card */}
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-gray-900">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Administrator
            </p>

            <p className="text-xs text-gray-500">
              Manage your restaurant
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <FaArrowRightToBracket className="text-lg transition-transform duration-200 group-hover:translate-x-1" />

          <span>Logout</span>
        </button>

      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  FaTachometerAlt,
  FaUtensils,
  FaShoppingCart,
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
      href: "/user/dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      href: "/user/foods",
      label: "Foods",
      icon: <FaUtensils />,
    },
    {
      href: "/user/orders",
      label: "Orders",
      icon: <FaShoppingCart />,
    },
    {
      href: "/user/profile",
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

      {/* ================= LOGO ================= */}
      <div className="border-b border-white/10 px-6 py-6">

        <Link
          href="/user/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg font-extrabold text-black">
            F
          </div>

          <div>
            <h1 className="text-lg font-extrabold">
              Food
              <span className="text-yellow-400">
                Courier
              </span>
            </h1>

            <p className="text-[10px] uppercase tracking-widest text-gray-400">
              User Panel
            </p>
          </div>
        </Link>

      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Menu
        </p>

        <ul className="space-y-2">

          {menu.map((item) => {

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>

                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >

                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
                      isActive
                        ? "bg-black/10 text-gray-900"
                        : "bg-white/5 text-gray-400 group-hover:text-yellow-400"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-gray-900" />
                  )}

                </Link>

              </li>
            );
          })}

        </ul>
      </nav>

      {/* ================= USER CARD ================= */}
      <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-gray-900">
            U
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">
              User Account
            </p>

            <p className="text-xs text-gray-500">
              Customer
            </p>
          </div>

        </div>

      </div>

      {/* ================= LOGOUT ================= */}
      <div className="border-t border-white/10 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition group-hover:bg-red-500/10">
            <FaArrowRightToBracket size={14} />
          </span>

          Logout

        </button>

      </div>

    </aside>
  );
}
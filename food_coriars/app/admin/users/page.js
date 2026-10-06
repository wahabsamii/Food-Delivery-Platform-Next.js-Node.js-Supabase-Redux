"use client";

import { useEffect, useState } from "react";
import {
  FaTrash,
  FaEye,
  FaUsers,
  FaSyncAlt,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import { serverUrl } from "../../lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${serverUrl}/api/users`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${serverUrl}/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Users
            </h1>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
              {users.length} Total
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Manage registered users and their account roles.
          </p>
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={fetchUsers}
          disabled={loading}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaSyncAlt
            size={13}
            className={loading ? "animate-spin" : ""}
          />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <strong>Error:</strong> {error}
          </span>

          <button
            type="button"
            onClick={fetchUsers}
            className="font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">

          <FaSyncAlt
            size={28}
            className="mx-auto animate-spin text-yellow-500"
          />

          <p className="mt-4 font-semibold text-gray-700">
            Loading users...
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Please wait while we fetch registered users.
          </p>
        </div>
      ) : users.length === 0 ? (

        /* ================= EMPTY ================= */
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <FaUsers size={25} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            No users found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            There are currently no registered users in your
            food delivery platform.
          </p>
        </div>
      ) : (

        /* ================= TABLE ================= */
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

            <div>
              <h2 className="font-bold text-gray-900">
                Registered Users
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                All users currently registered on the platform.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
              <FaUsers />
            </div>
          </div>

          <div className="overflow-x-auto">

            <table className="min-w-[850px] w-full text-sm">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">

                  <th className="w-20 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {users.map((user, index) => {

                  const role =
                    user.role || "user";

                  const isAdmin =
                    role.toLowerCase() === "admin";

                  return (
                    <tr
                      key={user.id}
                      className="group transition hover:bg-yellow-50/40"
                    >

                      {/* Number */}
                      <td className="px-6 py-5">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 transition group-hover:bg-yellow-100 group-hover:text-yellow-700">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                      </td>

                      {/* User */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-700">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase() || (
                              <FaUser size={14} />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {user.name || "Unknown User"}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              Registered user
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Email */}
                      <td className="px-6 py-5">

                        <span className="text-gray-600">
                          {user.email}
                        </span>

                      </td>

                      {/* Role */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            isAdmin
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {role}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">

                        <div className="flex justify-end gap-2">

                          {/* View */}
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedUser(user)
                            }
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 transition hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
                          >
                            <FaEye size={12} />
                            View
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            disabled={true}
                            onClick={() =>
                              handleDelete(user.id)
                            }
                            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-500 transition hover:border-red-200 hover:bg-red-100 hover:text-red-600"
                          >
                            <FaTrash size={12} />
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= USER DETAILS MODAL ================= */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  User Details
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Account information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
              >
                <FaTimes size={14} />
              </button>

            </div>

            {/* User Info */}
            <div className="p-6">

              <div className="mb-6 flex flex-col items-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-2xl font-extrabold text-yellow-700">
                  {selectedUser.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {selectedUser.name}
                </h3>

                <span className="mt-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {selectedUser.role || "user"}
                </span>

              </div>

              <div className="space-y-3">

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Name
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedUser.name}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 break-all font-semibold text-gray-800">
                    {selectedUser.email}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Role
                  </p>

                  <p className="mt-1 font-semibold capitalize text-gray-800">
                    {selectedUser.role || "user"}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
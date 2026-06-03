// app/users/page.tsx
"use client";
import { useState } from "react";
import { users as initialUsers } from "@/lib/data";
import { Search, UserX } from "lucide-react";

const roleColors: Record<string, string> = {
  admin: "bg-red-50 text-red-700",
  manager: "bg-blue-50 text-blue-700",
  customer: "bg-gray-100 text-gray-600",
};

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  
  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Users</h1>
        <p className="text-sm text-gray-400 mt-0.5">{users.length} registered users</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-2 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Orders</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-800">{u.name}</td>
                <td className="px-5 py-3 text-gray-500">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                
                <td className="px-5 py-3 text-gray-600">{u.orders + " orders"}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">{u.joined}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    u.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleStatus(u.id)}
                    title={u.status === "active" ? "Deactivate" : "Activate"}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <UserX size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-400 text-sm">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// app/orders/page.tsx
"use client";
import { useState } from "react";
import { orders as initialOrders } from "@/lib/data";
import { Search } from "lucide-react";

const STATUS_OPTIONS = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  // BUG 3: currentPage starts at 0 instead of 1, causing the first page to be page 0
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // BUG 4: totalPages is calculated before filtering, so pagination count is always wrong
  const totalPages = Math.ceil(orders.length / perPage);
  const paginated = filtered.slice(currentPage * perPage, currentPage * perPage + perPage);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-400 mt-0.5">{orders.length} total orders</p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setCurrentPage(0); }}
            className={`text-xs px-3 py-1.5 rounded-md capitalize transition-colors ${
              statusFilter === s ? "bg-white text-gray-800 shadow-sm font-medium" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs mb-4">
        <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-mono text-xs text-gray-400">{order.id}</td>
                <td className="px-5 py-3 text-gray-700">{order.customer}</td>
                <td className="px-5 py-3 text-gray-500">{order.product}</td>
                <td className="px-5 py-3 text-gray-700">₹{order.amount.toLocaleString()}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">{order.date}</td>
                <td className="px-5 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer focus:outline-none ${statusColors[order.status]}`}
                  >
                    {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                      <option key={s} value={s} className="bg-white text-gray-700">{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Page {currentPage + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 disabled:opacity-40 hover:bg-gray-50"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
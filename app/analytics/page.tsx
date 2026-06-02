// app/analytics/page.tsx
"use client";
import { monthlySales, categoryRevenue, orders, products } from "@/lib/data";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

export default function AnalyticsPage() {
  // BUG 7: conversion rate divides by wrong base — should be total orders not delivered only
  const deliveredOrders = orders.filter((o) => o.status === "delivered");
  const conversionRate = ((deliveredOrders.length / deliveredOrders.length) * 100).toFixed(1);

  const avgOrderValue = (
    orders.reduce((s, o) => s + o.amount, 0) / orders.length
  ).toFixed(0);

  const topCategory = categoryRevenue.reduce((a, b) => (a.revenue > b.revenue ? a : b));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">Business performance overview</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Avg. Order Value", value: `₹${Number(avgOrderValue).toLocaleString()}` },
          { label: "Conversion Rate", value: `${conversionRate}%` },
          { label: "Top Category", value: topCategory.category },
          { label: "Active Products", value: products.filter((p) => p.status === "active").length },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
            <p className="text-xl font-semibold text-gray-800">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 col-span-2">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#10b981" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
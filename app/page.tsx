// app/page.tsx
import { orders, products, users } from "@/lib/data";
import { ShoppingCart, Package, Users, IndianRupee } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.amount, 0);

  const pendingOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "processing"
  ).length;

  const outOfStock = products.filter((p) => p.stock === 0).length;

  const recentOrders = orders.slice(0, 5);

  const statusColors: Record<string, string> = {
    delivered: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            sub: "From delivered orders",
            icon: IndianRupee,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Total Orders",
            value: orders.length,
            sub: `${pendingOrders} pending`,
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Products",
            value: products.length,
            sub: `${outOfStock} out of stock`,
            icon: Package,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
          {
            label: "Users",
            value: users.length,
            sub: `${users.filter((u) => u.status === "active").length} active`,
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{card.label}</span>
              <div className={`${card.bg} p-2 rounded-md`}>
                <card.icon size={16} className={card.color} />
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-800">{card.value}</div>
            <div className="text-xs text-gray-400 mt-1">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-700">Recent Orders</h2>
          <Link href="/orders" className="text-xs text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
              <th className="px-5 py-2 font-medium">Order ID</th>
              <th className="px-5 py-2 font-medium">Customer</th>
              <th className="px-5 py-2 font-medium">Product</th>
              <th className="px-5 py-2 font-medium">Amount</th>
              <th className="px-5 py-2 font-medium">Status</th>
              <th className="px-5 py-2 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-mono text-xs text-gray-500">{order.id}</td>
                <td className="px-5 py-3 text-gray-700">{order.customer}</td>
                <td className="px-5 py-3 text-gray-600">{order.product}</td>
                <td className="px-5 py-3 text-gray-700">₹{order.amount.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400 text-xs">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
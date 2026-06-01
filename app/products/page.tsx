// app/products/page.tsx
"use client";
import { useState } from "react";
import { products as initialProducts } from "@/lib/data";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "" });

  const categories = ["all", ...Array.from(new Set(initialProducts.map((p) => p.category)))];

  // BUG 1: filter uses || instead of && — searching "shirt" in "Clothing" won't narrow both
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch || matchCat;
  });

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", category: "", price: "", stock: "" });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, category: p.category, price: String(p.price), stock: String(p.stock) });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!form.name || !form.category) return;
    if (editProduct) {
      setProducts(
        products.map((p) =>
          p.id === editProduct.id
            ? { ...p, name: form.name, category: form.category, price: Number(form.price), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      // BUG 2: new product gets a duplicate ID pattern that could clash
      const newP: Product = {
        id: `P00${products.length + 1}`,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        status: "active",
      };
      setProducts([...products, newP]);
    }
    setShowModal(false);
  };

  const stockBadge = (stock: number) => {
    if (stock === 0) return <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Out of stock</span>;
    if (stock < 10) return <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Low ({stock})</span>;
    return <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{stock} units</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">{products.length} total products</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-2 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-xs text-gray-500">
              <th className="px-5 py-3 font-medium">ID</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-mono text-xs text-gray-400">{p.id}</td>
                <td className="px-5 py-3 text-gray-800 font-medium">{p.name}</td>
                <td className="px-5 py-3 text-gray-500">{p.category}</td>
                <td className="px-5 py-3 text-gray-700">₹{p.price.toLocaleString()}</td>
                <td className="px-5 py-3">{stockBadge(p.stock)}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <div className="space-y-3">
              {[
                { label: "Product Name", key: "name", type: "text" },
                { label: "Category", key: "category", type: "text" },
                { label: "Price (₹)", key: "price", type: "number" },
                { label: "Stock", key: "stock", type: "number" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                {editProduct ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
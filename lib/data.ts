// lib/data.ts

export const products = [
  { id: "P001", name: "Wireless Headphones", category: "Electronics", price: 2499, stock: 34, status: "active" },
  { id: "P002", name: "Running Shoes", category: "Footwear", price: 1899, stock: 0, status: "out_of_stock" },
  { id: "P003", name: "Cotton T-Shirt", category: "Clothing", price: 499, stock: 120, status: "active" },
  { id: "P004", name: "Yoga Mat", category: "Fitness", price: 799, stock: 15, status: "active" },
  { id: "P005", name: "Steel Water Bottle", category: "Kitchen", price: 349, stock: 67, status: "active" },
  { id: "P006", name: "Bluetooth Speaker", category: "Electronics", price: 1599, stock: 0, status: "out_of_stock" },
  { id: "P007", name: "Notebook Set", category: "Stationery", price: 199, stock: 200, status: "active" },
  { id: "P008", name: "Sunglasses", category: "Accessories", price: 999, stock: 42, status: "active" },
  { id: "P009", name: "Dumbbell Pair", category: "Fitness", price: 2199, stock: 8, status: "active" },
  { id: "P010", name: "Desk Lamp", category: "Furniture", price: 699, stock: 0, status: "discontinued" },
];

export const orders = [
  { id: "ORD-1001", customer: "Ravi Kumar", product: "Wireless Headphones", amount: 2499, status: "delivered", date: "2024-05-20" },
  { id: "ORD-1002", customer: "Priya Nair", product: "Running Shoes", amount: 1899, status: "pending", date: "2024-05-21" },
  { id: "ORD-1003", customer: "Arun Sharma", product: "Cotton T-Shirt", amount: 499, status: "processing", date: "2024-05-22" },
  { id: "ORD-1004", customer: "Meera Pillai", product: "Yoga Mat", amount: 799, status: "cancelled", date: "2024-05-19" },
  { id: "ORD-1005", customer: "Karthik Raj", product: "Steel Water Bottle", amount: 349, status: "delivered", date: "2024-05-18" },
  { id: "ORD-1006", customer: "Sneha Iyer", product: "Bluetooth Speaker", amount: 1599, status: "shipped", date: "2024-05-23" },
  { id: "ORD-1007", customer: "Vikram Das", product: "Notebook Set", amount: 199, status: "delivered", date: "2024-05-17" },
  { id: "ORD-1008", customer: "Ananya Roy", product: "Sunglasses", amount: 999, status: "pending", date: "2024-05-24" },
  { id: "ORD-1009", customer: "Deepak Nair", product: "Dumbbell Pair", amount: 2199, status: "processing", date: "2024-05-25" },
  { id: "ORD-1010", customer: "Lakshmi Menon", product: "Desk Lamp", amount: 699, status: "shipped", date: "2024-05-22" },
  { id: "ORD-1011", customer: "Rajesh Varma", product: "Wireless Headphones", amount: 2499, status: "delivered", date: "2024-05-15" },
  { id: "ORD-1012", customer: "Swathi Krishnan", product: "Cotton T-Shirt", amount: 499, status: "cancelled", date: "2024-05-14" },
];

export const users = [
  { id: "U001", name: "Ravi Kumar", email: "ravi@example.com", role: "customer", joined: "2024-01-10", orders: 5, status: "active" },
  { id: "U002", name: "Priya Nair", email: "priya@example.com", role: "customer", joined: "2024-02-14", orders: 2, status: "active" },
  { id: "U003", name: "Arun Sharma", email: "arun@example.com", role: "admin", joined: "2023-12-01", orders: 0, status: "active" },
  { id: "U004", name: "Meera Pillai", email: "meera@example.com", role: "customer", joined: "2024-03-05", orders: 8, status: "inactive" },
  { id: "U005", name: "Karthik Raj", email: "karthik@example.com", role: "customer", joined: "2024-01-22", orders: 3, status: "active" },
  { id: "U006", name: "Sneha Iyer", email: "sneha@example.com", role: "manager", joined: "2024-02-28", orders: 1, status: "active" },
  { id: "U007", name: "Vikram Das", email: "vikram@example.com", role: "customer", joined: "2024-04-11", orders: 6, status: "active" },
  { id: "U008", name: "Ananya Roy", email: "ananya@example.com", role: "customer", joined: "2024-04-30", orders: 0, status: "inactive" },
];

export const monthlySales = [
  { month: "Jan", revenue: 45000, orders: 120 },
  { month: "Feb", revenue: 52000, orders: 145 },
  { month: "Mar", revenue: 48000, orders: 132 },
  { month: "Apr", revenue: 61000, orders: 178 },
  { month: "May", revenue: 55000, orders: 160 },
  { month: "Jun", revenue: 67000, orders: 195 },
  { month: "Jul", revenue: 72000, orders: 210 },
  { month: "Aug", revenue: 69000, orders: 202 },
  { month: "Sep", revenue: 74000, orders: 218 },
  { month: "Oct", revenue: 81000, orders: 235 },
  { month: "Nov", revenue: 95000, orders: 280 },
  { month: "Dec", revenue: 110000, orders: 320 },
];

export const categoryRevenue = [
  { category: "Electronics", revenue: 85000 },
  { category: "Clothing", revenue: 42000 },
  { category: "Fitness", revenue: 38000 },
  { category: "Footwear", revenue: 31000 },
  { category: "Kitchen", revenue: 22000 },
  { category: "Accessories", revenue: 18000 },
];
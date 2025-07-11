"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FaUsers, FaBoxOpen, FaStore } from "react-icons/fa";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, stores: 0 });
  const [chartData, setChartData] = useState<{ category: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const [usersRes, productsRes, storesRes, chartRes] = await Promise.all([
        fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/products"),
        fetch("/api/stores"),
        fetch("/api/products"),
      ]);
      const users = await usersRes.json();
      const products = await productsRes.json();
      const stores = await storesRes.json();
      const productsByCategory: Record<string, number> = {};
      (await chartRes.json()).forEach((p: any) => {
        productsByCategory[p.category] = (productsByCategory[p.category] || 0) + 1;
      });
      setStats({ users: users.length, products: products.length, stores: stores.length });
      setChartData(Object.entries(productsByCategory).map(([category, count]) => ({ category, count })));
      setLoading(false);
    }
    fetchStats();
  }, []);

  const cardStyle =
    "flex flex-col items-center justify-center rounded-xl shadow-lg p-6 min-h-[120px] text-white bg-gradient-to-br";
  const cards = [
    {
      icon: <FaUsers size={32} />, label: "Users", value: stats.users, gradient: "from-pink-500 to-red-400",
    },
    {
      icon: <FaBoxOpen size={32} />, label: "Produk", value: stats.products, gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaStore size={32} />, label: "Toko", value: stats.stores, gradient: "from-green-500 to-lime-400",
    },
  ];

  const isDarkMode = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <div className="p-2 md:p-8">
      <div className="pagetitle mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <nav className="text-sm text-gray-500 dark:text-gray-300">
          <ol className="flex gap-2">
            <li><a href="/admin/dashboard" className="hover:underline">Home</a></li>
            <li className="text-gray-700 dark:text-gray-200">/ Dashboard</li>
          </ol>
        </nav>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((c, i) => (
          <div key={i} className={`${cardStyle} bg-gradient-to-br ${c.gradient}`}>
            <div className="mb-2">{c.icon}</div>
            <div className="text-3xl font-bold">{c.value}</div>
            <div className="text-lg font-semibold mt-1">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Produk per Kategori (Bar)</h2>
          {loading ? (
            <div>Loading chart...</div>
          ) : (
            <ApexCharts
              type="bar"
              height={350}
              series={[{ name: "Produk", data: chartData.map(d => d.count) }]}
              options={{
                chart: { toolbar: { show: true }, foreColor: "#888" },
                xaxis: { categories: chartData.map(d => d.category) },
                colors: ["#ff4560", "#775dd0", "#00e396", "#008ffb", "#feb019"],
                plotOptions: { bar: { horizontal: false, borderRadius: 6 } },
                dataLabels: { enabled: false },
                stroke: { show: true, width: 2, colors: ["transparent"] },
                yaxis: { title: { text: "Jumlah Produk" } },
                fill: { opacity: 0.9 },
                tooltip: { y: { formatter: (val: number) => `${val} Produk` } },
                theme: { mode: isDarkMode ? "dark" : "light" },
              }}
            />
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Distribusi Produk (Pie)</h2>
          {loading ? (
            <div>Loading chart...</div>
          ) : (
            <ApexCharts
              type="pie"
              height={350}
              series={chartData.map(d => d.count)}
              options={{
                labels: chartData.map(d => d.category),
                colors: ["#ff4560", "#775dd0", "#00e396", "#008ffb", "#feb019"],
                legend: { position: "bottom", labels: { colors: isDarkMode ? ["#fff"] : ["#333"] } },
                theme: { mode: isDarkMode ? "dark" : "light" },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
} 
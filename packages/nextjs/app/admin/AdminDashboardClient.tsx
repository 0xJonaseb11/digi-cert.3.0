"use client";

import React, { useEffect, useState } from "react";
import AdminActivityTable from "../../components/admin/AdminActivityTable";
import AdminDashboardCharts from "../../components/admin/AdminDashboardCharts";
import { motion } from "framer-motion";
import { CheckCircle, Clock, FileText, MoreVertical, XCircle } from "lucide-react";

const stats = [
  {
    label: "Certificates Claimed",
    value: 1280,
    percent: 23,
    icon: <FileText className="w-6 h-6 text-blue-400 drop-shadow-glow" />,
    color: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700",
  },
  {
    label: "Pending Verifications",
    value: 87,
    percent: 23,
    icon: <Clock className="w-6 h-6 text-yellow-300 drop-shadow-glow" />,
    color: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700",
  },
  {
    label: "Approved Certificates",
    value: 1200,
    percent: 23,
    icon: <CheckCircle className="w-6 h-6 text-green-300 drop-shadow-glow" />,
    color: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700",
  },
  {
    label: "Invalid / Revoked",
    value: 15,
    percent: 23,
    icon: <XCircle className="w-6 h-6 text-red-300 drop-shadow-glow" />,
    color: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700",
  },
];

function useCountUp(target: number, duration = 1) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = 0;
    const end = target;
    if (start === end) return;
    const increment = end / (duration * 60);
    let current = start;
    const step = () => {
      current += increment;
      if (current >= end) {
        setCount(end);
      } else {
        setCount(Math.floor(current));
        requestAnimationFrame(step);
      }
    };
    step();
 }, [target, duration]);
  return count;
}

export default function AdminDashboardClient() {
  return (
    <motion.div
      className="space-y-8 w-full max-w-6xl mx-auto"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold text-gray-900">Welcome, Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, we’re happy to have you here!</p>
      </motion.div>
      {/* Stat Cards 2x2 + Chart Grouped in One Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 2x2 Stat Cards Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full">
          {stats.map((stat, i) => {
            const count = useCountUp(stat.value, 1.2);
            return (
              <motion.div
                key={stat.label}
                className={`rounded-2xl shadow-xl ${stat.color} flex items-center p-5 gap-4 relative transition hover:scale-[1.03] hover:shadow-2xl group backdrop-blur-md bg-opacity-70`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                {/* Glassmorphism overlay */}
                <div
                  className="absolute inset-0 rounded-2xl bg-white/10 pointer-events-none"
                  style={{ backdropFilter: "blur(8px)" }}
                />
                <div className="rounded-xl p-3 bg-blue-800/40 flex items-center justify-center shadow-glow relative z-10">
                  {stat.icon}
                </div>
                <div className="flex-1 relative z-10">
                  <div className="text-xs text-blue-200 font-medium mb-1 group-hover:text-white transition">
                    {stat.label}
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-white group-hover:text-blue-200 transition">{count}</span>
                    <span className="text-xs text-blue-300 mb-1">{stat.percent}%</span>
                  </div>
                </div>
                <button
                  className="absolute top-3 right-3 p-1 rounded hover:bg-blue-800/60 z-10"
                  aria-label="More options"
                >
                  <MoreVertical className="w-4 h-4 text-blue-300 group-hover:text-white transition" />
                </button>
              </motion.div>
            );
          })}
        </div>
        {/* Chart + Stat Cards Grouped Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center items-center w-full"
        >
          <div className="w-full max-w-lg">
            <AdminDashboardCharts />
          </div>
        </motion.div>
      </div>
      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <AdminActivityTable />
      </motion.div>
    </motion.div>
  );
}

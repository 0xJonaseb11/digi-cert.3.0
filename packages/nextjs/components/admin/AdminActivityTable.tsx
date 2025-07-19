import React from "react";
import { ChevronRight, User } from "lucide-react";

const activities = [
  {
    by: "Grand Rapids",
    role: "Manager",
    time: "2. Jun, 2024 12:23 pm",
    status: "Online",
    statusColor: "text-green-600 bg-green-100",
    enterprise: "SINA Gerard",
    badge: "VISA",
  },
  // ...repeat for demo
  {
    by: "Grand Rapids",
    role: "Manager",
    time: "2. Jun, 2024 12:23 pm",
    status: "Online",
    statusColor: "text-green-600 bg-green-100",
    enterprise: "SINA Gerard",
    badge: "VISA",
  },
  {
    by: "Grand Rapids",
    role: "Manager",
    time: "2. Jun, 2024 12:23 pm",
    status: "Online",
    statusColor: "text-green-600 bg-green-100",
    enterprise: "SINA Gerard",
    badge: "VISA",
  },
  {
    by: "Grand Rapids",
    role: "Manager",
    time: "2. Jun, 2024 12:23 pm",
    status: "Online",
    statusColor: "text-green-600 bg-green-100",
    enterprise: "SINA Gerard",
    badge: "VISA",
  },
  {
    by: "Grand Rapids",
    role: "Manager",
    time: "2. Jun, 2024 12:23 pm",
    status: "Online",
    statusColor: "text-green-600 bg-green-100",
    enterprise: "SINA Gerard",
    badge: "VISA",
  },
];

export default function AdminActivityTable() {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="px-6 py-3 text-left font-semibold">Performed By</th>
            <th className="px-6 py-3 text-left font-semibold">Timestamp</th>
            <th className="px-6 py-3 text-left font-semibold">Status</th>
            <th className="px-6 py-3 text-left font-semibold">Enterprise</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="px-6 py-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </span>
                <div>
                  <div className="font-semibold text-gray-800 leading-tight">{a.by}</div>
                  <div className="text-xs text-gray-400">{a.role}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{a.time}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${a.statusColor}`}>
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  {a.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">{a.badge}</span>
                  <span className="text-gray-700 font-medium">{a.enterprise}</span>
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50 text-xs text-gray-500">
        <button className="px-2 py-1 rounded hover:bg-gray-200">&larr; Prev</button>
        <div>
          <span className="font-semibold text-gray-700">1</span> 2 ... 6
        </div>
        <button className="px-2 py-1 rounded hover:bg-gray-200">Next &rarr;</button>
      </div>
    </div>
  );
} 
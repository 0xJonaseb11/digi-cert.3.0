import React from "react";
import { FileText, Clock, CheckCircle, XCircle, MoreVertical } from "lucide-react";

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

export default function AdminDashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl shadow-xl ${stat.color} flex items-center p-5 gap-4 relative transition hover:scale-[1.03] hover:shadow-2xl group`}
        >
          <div className="rounded-xl p-3 bg-blue-800/40 flex items-center justify-center shadow-glow">
            {stat.icon}
          </div>
          <div className="flex-1">
            <div className="text-xs text-blue-200 font-medium mb-1 group-hover:text-white transition">{stat.label}</div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-white group-hover:text-blue-200 transition">{stat.value}</span>
              <span className="text-xs text-blue-300 mb-1">{stat.percent}%</span>
            </div>
          </div>
          <button className="absolute top-3 right-3 p-1 rounded hover:bg-blue-800/60" aria-label="More options">
            <MoreVertical className="w-4 h-4 text-blue-300 group-hover:text-white transition" />
          </button>
        </div>
      ))}
    </div>
  );
}

// Add this to your global CSS for glowing effect:
// .drop-shadow-glow { filter: drop-shadow(0 0 8px #60a5fa); }
// .shadow-glow { box-shadow: 0 0 16px 0 #60a5fa33; } 
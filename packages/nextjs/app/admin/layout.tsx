import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { cn } from "../../utils/scaffold-eth/common";
import { Bell, Search } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex min-h-screen bg-gray-50", montserrat.className)}>
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-blue-900 rounded-b-2xl flex items-center px-6 justify-between shadow-lg mt-2">
          {/* Search bar */}
          <div className="flex items-center gap-2 w-1/3 min-w-[220px] bg-blue-800 rounded-lg px-3 py-1 shadow-inner">
            <span className="text-blue-200">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search for..."
              className="flex-1 border-none outline-none bg-transparent text-white placeholder-blue-200 py-2 px-2"
              style={{ background: "none" }}
            />
          </div>
          {/* Right side: notifications and profile */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-blue-800" aria-label="Notifications">
              <Bell className="w-5 h-5 text-blue-200" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-blue-900"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center font-bold text-white text-lg border border-blue-400 shadow-md">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 bg-gray-50">{children}</div>
      </main>
    </div>
  );
}

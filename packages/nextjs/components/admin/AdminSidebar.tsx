import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { Home, FileText, ShieldCheck, Users, Briefcase, History, Settings, PlusCircle } from "lucide-react";

export default function AdminSidebar() {
  return (
    <SidebarProvider>
      <Sidebar className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white flex flex-col w-64 min-h-screen rounded-r-3xl shadow-xl">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center justify-center h-24 border-b border-blue-800 px-4 pt-6 pb-2">
          <Image src="/logo.svg" alt="DIGI-CERT Logo" width={40} height={40} />
          <span className="mt-2 text-lg font-bold text-white text-center leading-tight">DIGI-CERT<br /><span className="text-xs font-normal text-blue-200">Admin Portal</span></span>
        </div>
        <SidebarContent className="flex-1 flex flex-col justify-between">
          <nav className="mt-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-800 font-medium transition">
                  <Home className="w-5 h-5 text-white" /> Dashboard
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/certificates" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-800 transition">
                  <FileText className="w-5 h-5 text-white" /> Certificates
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/inspection" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-800 transition">
                  <ShieldCheck className="w-5 h-5 text-white" /> Inspection
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/audition" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-800 transition">
                  <Users className="w-5 h-5 text-white" /> Audition
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/roles" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-800 transition">
                  <Settings className="w-5 h-5 text-white" /> Roles & Permissions
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/enterprises" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-800 transition">
                  <Briefcase className="w-5 h-5 text-white" /> Enterprises
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/activity" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-800 transition">
                  <History className="w-5 h-5 text-white" /> Activity History
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </nav>
          {/* Let's start! section */}
          <div className="mt-8 mb-4 px-4">
            <div className="bg-blue-800 rounded-lg p-4 flex flex-col items-center text-center mb-4 shadow-md">
              <span className="font-semibold text-white">Let's start!</span>
              <span className="text-xs text-blue-200 mt-1">Request Certificate</span>
            </div>
            <Link href="/admin/register-enterprise" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-500 font-bold text-sm shadow-lg transition">
              <PlusCircle className="w-4 h-4" /> Register Enterprise
            </Link>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
} 
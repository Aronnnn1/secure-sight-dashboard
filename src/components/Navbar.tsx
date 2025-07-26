// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  Cctv,
  Settings,
  AlertTriangleIcon,
  Users2,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/cameras", label: "Cameras", icon: Cctv },
  { href: "/scenes", label: "Scenes", icon: Settings },
  { href: "/incidents", label: "Incidents", icon: AlertTriangleIcon },
  { href: "/users", label: "Users", icon: Users2 },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-3 border-b border-[#FFE57F]/30 bg-[#0a0a0a] text-white">
      
      {/* Left - Logo & Brand */}
      <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
        <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-8 h-8" />
        Mandlacx
      </div>

      {/* Center - Navigation */}
      <div className="flex gap-8">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors",
                isActive
                  ? "border border-[#FFCC00] bg-[#1a1a1a] text-white"
                  : "text-[#BFBFBF] hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right - User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted/20 transition-colors">
            <div className="text-right">
              <div className="text-sm font-medium text-white">Mohammed Ajhas</div>
              <div className="text-xs text-[#CCCCCC]">ajhas@mandlac.com</div>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/pfp.png" alt="User profile" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-[#1a1a1a] text-white border border-[#333]">
          <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

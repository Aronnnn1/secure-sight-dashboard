"use client";

import { format } from "date-fns";

export default function DashboardHeader() {
  const today = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back 👋</h1>
        <p className="text-sm text-muted-foreground">Today is {today}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-200" />
    </div>
  );
}
// src/components/dashboard/MetricsGrid.tsx
"use client";

import DashboardCard from "./DashboardCard";

export default function MetricsGrid() {
  const metrics = [
    { label: "Total Users", value: "1,234", icon: "users" },
    { label: "Active Sessions", value: "312", icon: "activity" },
    { label: "Reported Issues", value: "7", icon: "alert-triangle" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <DashboardCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}

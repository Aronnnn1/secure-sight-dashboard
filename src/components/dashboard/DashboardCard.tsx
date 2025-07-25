// src/components/dashboard/DashboardCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Users, Activity, AlertTriangle } from "lucide-react";

type Props = {
  label: string;
  value: string;
  icon: string;
};

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  activity: Activity,
  "alert-triangle": AlertTriangle,
};

export default function DashboardCard({ label, value, icon }: Props) {
  const Icon = iconMap[icon];

  return (
    <Card className="flex items-center gap-4">
      <div className="p-2 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200">
        <Icon className="w-6 h-6" />
      </div>
      <CardContent className="p-0">
        <h3 className="text-sm text-muted-foreground">{label}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

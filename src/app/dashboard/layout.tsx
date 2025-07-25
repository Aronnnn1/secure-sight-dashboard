import "@/app/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-[rgba(141, 101, 14, 0.02)] text-[#ededed]">
        {children}
      </main>
    </div>
  );
}

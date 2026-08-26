import { Sidebar } from "@/shared/ui/dashboard/Sidebar";
import { UnauthorizedAlert } from "@/shared/ui/dashboard/UnauthorizedAlert";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <aside className="w-55 flex-shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        <UnauthorizedAlert />
        {children}
      </main>
    </div>
  );
}
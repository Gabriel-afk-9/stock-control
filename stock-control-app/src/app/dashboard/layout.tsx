import { Sidebar } from "@/shared/ui/dashboard/Sidebar";
import { UnauthorizedAlert } from "@/shared/ui/dashboard/UnauthorizedAlert";
import { SessionService } from "@/features/auth/infrastructure/session/session.service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await SessionService.getSession();

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <aside className="w-55 flex-shrink-0">
        <Sidebar user={user} />
      </aside>

      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        <UnauthorizedAlert />
        {children}
      </main>
    </div>
  );
}
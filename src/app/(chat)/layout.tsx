import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import Navbar from "@/components/shared/navbar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#0d0f14]  text-white">
      <SidebarProvider>
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto pb-40">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}

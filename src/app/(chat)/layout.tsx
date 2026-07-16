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
        <main className="flex-1 min-h-screen w-full">
          <Navbar />
          <div className="p-5">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import Navbar from "@/components/shared/navbar";
import { auth } from "@clerk/nextjs/server";
import { createUser } from "@/lib/user";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (userId) {
    await createUser();
  }
  return (
    <div className="min-h-screen bg-[#0d0f14]  text-white">
      <SidebarProvider>
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto pb-40">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}

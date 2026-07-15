import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";
import { getConversation } from "@/app/actions/get-conversation";
import SidebarContentClient from "./sidebar-content-client";

export async function AppSidebar() {
  const conversations = await getConversation();

  return (
    <Sidebar className="bg-[#0d0f14]  border-white/6 px-4 py-2">
      <SidebarHeader className="text-2xl font-semibold">
        <div className="flex flex-row items-center gap-4">
          <BookOpen />
          <h2>Nebula AI</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarContentClient conversations={conversations} />
      </SidebarContent>

      <SidebarFooter>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </SidebarFooter>
    </Sidebar>
  );
}

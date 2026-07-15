import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { BookOpen, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getConversation } from "@/app/actions/get-conversation";
import SidebarContentClient from "./sidebar-content-client";

export async function AppSidebar() {
  const conversations = await getConversation();

  return (
    <Sidebar className="bg-black px-4 py-2">
      <SidebarHeader className="text-2xl font-semibold">
        <div className="flex flex-row items-center gap-4">
          <BookOpen />
          <h2>Nebula AI</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarContentClient conversations={conversations} />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { BookOpen } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-900 px-4 py-2">
      <SidebarHeader className="text-2xl font-semibold">
        <div className="flex flex-row items-center gap-4">
          <BookOpen />
          <h2> Nebula AI</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <Button className="w-full bg-indigo-600 ">New Chat</Button>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

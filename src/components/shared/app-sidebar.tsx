import { getConversation } from "@/app/actions/get-conversation";
import AppSidebarClient from "@/components/shared/app-sidebar-client";

export async function AppSidebar() {
  const conversations = await getConversation();

  return <AppSidebarClient conversations={conversations} />;
}

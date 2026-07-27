import { getCurrentUser } from "@/app/actions/get-current-user";
import { getConversation } from "@/app/actions/get-conversation";
import AppSidebarClient from "@/components/shared/app-sidebar-client";

export async function AppSidebar() {
  const conversations = await getConversation();
  const currentUser = await getCurrentUser();

  const safeConversations = conversations.map((c) => ({
    ...c,
    title: c.title ?? "",
  }));

  const safeCurrentUser = currentUser
    ? {
        ...currentUser,
        plan: { name: currentUser.plan?.name ?? "" },
      }
    : { plan: { name: "" } };

  return (
    <AppSidebarClient
      conversations={safeConversations}
      currentUser={safeCurrentUser}
    />
  );
}

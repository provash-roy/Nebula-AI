import { getConversationById } from "@/app/actions/get-conversation";
import Chat from "@/components/chat/chat";

interface ConversationPageProps {
  params: Promise<{
    cId: string;
  }>;
}
export default async function ConversationIdPage({
  params,
}: ConversationPageProps) {
  const { cId } = await params;

  console.log("Route ID:", cId);

  const conversation = await getConversationById(cId);

  console.log("DB Conversation:", conversation?.id);
  if (!conversation) {
    return null;
  }

  return <Chat conversation={conversation} />;
}

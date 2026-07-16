import { getConversationById } from "@/app/actions/get-conversation";
import Chat from "@/components/chat/chat";

interface ConversationPageProps {
  params: Promise<{
    conversationId: string;
  }>;
}
export default async function ConversationIdPage({
  params,
}: ConversationPageProps) {
  const { conversationId } = await params;

  const conversation = await getConversationById(conversationId);

  if (!conversation) {
    return null;
  }

  return <Chat conversation={conversation} />;
}

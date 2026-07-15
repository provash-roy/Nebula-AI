import { getConversationById } from "@/app/actions/get-conversation";
import ChatInput from "@/components/conversation/chat-input";
import ConversationMessages from "@/components/conversation/conversation-messages";

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

  return (
    <div className="flex h-screen flex-col">
      <ConversationMessages messages={conversation?.messages ?? []} />

      <ChatInput conversationId={conversationId} />
    </div>
  );
}

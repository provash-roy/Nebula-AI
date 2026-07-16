import { getConversationById } from "@/app/actions/get-conversation";
import ChatInput from "@/components/conversation/chat-input";
import MessageList from "@/components/conversation/message-list";

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
  console.log(conversation?.messages ?? []);
  return (
    <div className="flex min-h-screen flex-col">
      <MessageList messages={conversation?.messages ?? []} />
      <ChatInput />
    </div>
  );
}

import { getConversationById } from "@/app/actions/get-conversation";
import Chat from "@/components/chat/chat";
import MessageList from "@/components/chat/message-list";

interface ConversationPageProps {
  params: Promise<{
    cId: string;
  }>;
}
export default async function ConversationIdPage({
  params,
}: ConversationPageProps) {
  const { cId } = await params;

  const conversation = await getConversationById(cId);

  if (!conversation) {
    return null;
  }

  return (
    <div>
     
      <Chat conversation={conversation} />
    </div>
  );
}

import { RemoteComponent } from 'remote-components/next';
import ChatBotDemo from '@/components/chat/ChatBotDemo';

export default function RemoteChatPage() {
  return (
    <RemoteComponent name="chat">
      <ChatBotDemo />
    </RemoteComponent>
  );
}

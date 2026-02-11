import { RemoteComponent } from 'remote-components/next';
import ChatBotDemo from '@/components/chat/ChatBotDemo';

export default function Page() {
  return (
    <RemoteComponent>
      <ChatBotDemo />
    </RemoteComponent>
  );
}

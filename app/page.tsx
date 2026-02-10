import ChatSidebar from "@/components/chat/ChatSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <ChatSidebar />
      <SidebarInset>
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">B</span>
            </div>
            <span className="text-sm font-semibold">Bayer Intranet</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <div className="max-w-2xl text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, Maya
            </h1>
            <p className="text-lg text-muted-foreground">
              Tuesday, January 7, 2025 • Berlin, Germany
            </p>
            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                Open the sidebar to start chatting with the Bayer Assistant
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

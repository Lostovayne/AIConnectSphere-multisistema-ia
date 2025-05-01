import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment 02 - Crafted.is",
};

import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/chat";
import { ChatMessage } from "@/components/chat-message";
import { SettingsPanel, SettingsPanelProvider } from "@/components/settings-panel";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/sidebar";
import UserDropdown from "@/components/user-dropdown";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-sidebar group/sidebar-inset">
        <header className="dark flex h-16 shrink-0 items-center gap-2 px-4 md:px-6 lg:px-8 bg-sidebar text-sidebar-foreground relative before:absolute before:inset-y-3 before:-left-px before:w-px before:bg-gradient-to-b before:from-white/5 before:via-white/15 before:to-white/5 before:z-50">
          <SidebarTrigger className="-ms-2" />
          <div className="flex items-center gap-8 ml-auto">
            <nav className="flex items-center text-sm font-medium max-sm:hidden">
              <a
                className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors [&[aria-current]]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
                href="#"
                aria-current
              >
                Playground
              </a>
              <a
                className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors [&[aria-current]]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors [&[aria-current]]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
                href="#"
              >
                Docs
              </a>
              <a
                className="text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors [&[aria-current]]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
                href="#"
              >
                API Reference
              </a>
            </nav>
            <UserDropdown />
          </div>
        </header>
        <SettingsPanelProvider>
          <div className="flex h-[calc(100svh-4rem)] bg-[hsl(240_5%_92.16%)] md:rounded-s-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none transition-all ease-in-out duration-300">
            {/* renderizar el chat del usuario */}
            <Chat>
              <>
                <ChatMessage isUser>
                  <p>Hey Bolt, can you tell me more about AI Agents?</p>
                </ChatMessage>
                <ChatMessage>
                  <p>
                    AI agents are software that perceive their environment and act
                    autonomously to achieve goals, making decisions, learning, and
                    interacting. For example, an AI agent might schedule meetings by
                    resolving conflicts, contacting participants, and finding optimal
                    times—all without constant supervision.
                  </p>
                  <p>Let me know if you&lsquo;d like more details!</p>
                </ChatMessage>
                <ChatMessage isUser>
                  <p>All clear, thank you!</p>
                </ChatMessage>
                <ChatMessage>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic nisi ipsam, unde esse alias totam dolore nulla vitae molestiae, voluptatum in, natus iste soluta. Alias aperiam debitis sapiente pariatur perferendis.
                  </p>
                  <p>Let me know if you&lsquo;d like more details!</p>
                </ChatMessage>
              </>
            </Chat>
            <SettingsPanel />
          </div>
        </SettingsPanelProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}

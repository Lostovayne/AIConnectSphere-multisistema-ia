"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { ScrollArea } from "@/components/scroll-area";
import { SettingsPanelTrigger } from "@/components/settings-panel";
import { useChat } from "@ai-sdk/react";
import {
  RiAttachment2,
  RiCodeSSlashLine,
  RiLeafLine,
  RiMicLine,
  RiShareCircleLine,
  RiShareLine,
  RiShining2Line,
} from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chat-message";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  const [displayedText, setDisplayedText] = useState<string>("");

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Handle typewriter animation for the latest assistant message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      const fullText = lastMessage.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");
      let currentIndex = 0;

      // Clear previous text to start fresh
      setDisplayedText("");

      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          // Update text in smaller chunks for smoother animation
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex += 1; // Increment by 1 for precise character-by-character animation
          // Scroll to the end during animation
          messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        } else {
          clearInterval(interval);
        }
      }, 15); // Faster typing speed (15ms per character)

      return () => clearInterval(interval);
    } else {
      // Reset displayed text for non-assistant messages
      setDisplayedText("");
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 relative w-full shadow-md md:rounded-s-[inherit] min-[1024px]:rounded-e-3xl bg-background">
      <div className="h-[calc(100svh-4rem)] flex flex-col px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="py-5 bg-background sticky top-0 z-10 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
          <div className="flex items-center justify-between gap-2">
            <Breadcrumb>
              <BreadcrumbList className="sm:gap-1.5">
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Playground</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Chat</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-1 -my-2 -me-2">
              <Button variant="ghost" className="px-2">
                <RiCodeSSlashLine
                  className="text-muted-foreground sm:text-muted-foreground/70 size-5"
                  size={20}
                  aria-hidden="true"
                />
                <span className="max-sm:sr-only">Code</span>
              </Button>
              <Button variant="ghost" className="px-2">
                <RiShareLine
                  className="text-muted-foreground sm:text-muted-foreground/70 size-5"
                  size={20}
                  aria-hidden="true"
                />
                <span className="max-sm:sr-only">Share</span>
              </Button>
              <Button variant="ghost" className="px-2">
                <RiShareCircleLine
                  className="text-muted-foreground sm:text-muted-foreground/70 size-5"
                  size={20}
                  aria-hidden="true"
                />
                <span className="max-sm:sr-only">Export</span>
              </Button>
              <SettingsPanelTrigger />
            </div>
          </div>
        </div>
        {/* Chat */}
        <div className="relative grow flex">
          <div className="max-w-3xl mx-auto w-full mt-6 space-y-6">
            <div className="text-center my-8">
              <div className="inline-flex items-center bg-white rounded-full border border-black/[0.08] shadow-xs text-xs font-medium py-1 px-3 text-foreground/80">
                <RiShining2Line className="me-1.5 text-muted-foreground/70 -ms-1" size={14} aria-hidden="true" />
                Today
              </div>
            </div>
            {messages.map((message, index) => (
              <ChatMessage key={message.id} isUser={message.role === "user"}>
                <div>
                  {message.role === "assistant" && index === messages.length - 1 ? (
                    <span>{displayedText}</span> // Show animated text for the latest assistant message
                  ) : (
                    message.parts
                      .filter((part) => part.type === "text")
                      .map((part) => part.text)
                      .join("")
                  )}
                </div>
              </ChatMessage>
            ))}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        </div>
        {/* Footer */}
        <div className="sticky bottom-0 right-0 left-0 pt-4 md:pt-8 z-50">
          <div className="max-w-3xl mx-auto bg-background rounded-[20px] pb-4 md:pb-8">
            <form onSubmit={handleSubmit}>
              <div className="relative rounded-[20px] border border-transparent bg-muted transition-colors focus-within:bg-muted/50 focus-within:border-input has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
                <textarea
                  className="flex sm:min-h-[84px] w-full bg-transparent px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none [resize:none]"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  aria-label="Enter your prompt"
                />
                {/* Textarea buttons */}
                <div className="flex items-center justify-between gap-2 p-3">
                  {/* Left buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"
                    >
                      <RiAttachment2 className="text-muted-foreground/70 size-5" size={20} aria-hidden="true" />
                      <span className="sr-only">Attach</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"
                    >
                      <RiMicLine className="text-muted-foreground/70 size-5" size={20} aria-hidden="true" />
                      <span className="sr-only">Audio</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"
                    >
                      <RiLeafLine className="text-muted-foreground/70 size-5" size={20} aria-hidden="true" />
                      <span className="sr-only">Action</span>
                    </Button>
                  </div>
                  {/* Right buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                        <g clipPath="url(#icon-a)">
                          <path
                            fill="url(#icon-b)"
                            d="m8 .333 2.667 5 5 2.667-5 2.667-2.667 5-2.667-5L.333 8l5-2.667L8 .333Z"
                          />
                          <path
                            stroke="#451A03"
                            strokeOpacity=".04"
                            d="m8 1.396 2.225 4.173.072.134.134.071L14.604 8l-4.173 2.226-.134.071-.072.134L8 14.604l-2.226-4.173-.071-.134-.134-.072L1.396 8l4.173-2.226.134-.071.071-.134L8 1.396Z"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="icon-b"
                            x1="8"
                            x2="8"
                            y1=".333"
                            y2="15.667"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FDE68A" />
                            <stop offset="1" stopColor="#F59E0B" />
                          </linearGradient>
                          <clipPath id="icon-a">
                            <path fill="#fff" d="M0 0h16v16H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="sr-only">Generate</span>
                    </Button>
                    <Button type="submit" className="rounded-full h-8">
                      Ask Bart
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

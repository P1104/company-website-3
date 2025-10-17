"use client";

import { useState, FormEvent } from "react";
import { Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";

export function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
    },
    {
      id: 2,
      content: "I have a question about the component library.",
      sender: "user",
    },
    {
      id: 3,
      content: "Sure! I'd be happy to help. What would you like to know?",
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "This is an AI response to your message.",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {};
  const handleMicrophoneClick = () => {};

  return (
    <div className="relative theme-custom">
      <style jsx>{`
        .theme-custom [role="button"]:has(svg[stroke-width="2"]) {
          color: var(--primary-foreground) !important;
          background-color: var(--primary) !important;
        }
        .theme-custom [role="button"]:has(svg[stroke-width="2"]):hover {
          background-color: var(--primary) !important;
          opacity: 0.9;
        }
        /* Alternative selectors for close button */
        .theme-custom button:has(svg[data-lucide="x"]),
        .theme-custom button:has(svg[class*="lucide-x"]) {
          color: var(--primary-foreground) !important;
          background-color: var(--primary) !important;
        }
        .theme-custom button:has(svg[data-lucide="x"]):hover,
        .theme-custom button:has(svg[class*="lucide-x"]):hover {
          background-color: var(--primary) !important;
          opacity: 0.9;
        }
      `}</style>
      <ExpandableChat
        size="lg"
        position="bottom-right"
        icon={
          <div className="rounded-full p-4 flex items-center justify-center bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-colors">
            <Bot className="h-6 w-6 text-[var(--primary-foreground)]" />
          </div>
        }
      >
        <ExpandableChatHeader className="flex-col text-center justify-center bg-[var(--card)] border-b border-[var(--border)]">
          <h1 className="text-xl font-semibold text-[var(--card-foreground)]">
            Chat with AI
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Ask me anything about the components
          </p>
        </ExpandableChatHeader>

        <ExpandableChatBody className="bg-[var(--card)]">
          <ChatMessageList className="bg-[var(--card)]">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                  className={
                    message.sender === "user"
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  }
                >
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}
            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleMessage
                  isLoading
                  className="bg-[var(--muted)] text-[var(--muted-foreground)]"
                />
              </ChatBubble>
            )}
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter className="bg-[var(--card)] border-t border-[var(--border)]">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg border border-[var(--input)] focus-within:ring-1 focus-within:ring-[var(--ring)] p-1 bg-[var(--card)]"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-12 resize-none rounded-lg bg-[var(--card)] border-0 p-3 shadow-none focus-visible:ring-0 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
            />
            <div className="flex items-center p-3 pt-0 justify-between">
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={handleAttachFile}
                  className="hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
                >
                  <Paperclip className="size-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={handleMicrophoneClick}
                  className="hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
                >
                  <Mic className="size-4" />
                </Button>
              </div>
              <Button
                type="submit"
                size="sm"
                className="ml-auto gap-1.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)]"
              >
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
    </div>
  );
}
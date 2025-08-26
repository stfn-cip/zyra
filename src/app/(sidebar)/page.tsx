"use client";

import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import AppPromptInput from "@/features/chat/ui/app-prompt-input";
import { DefaultChatTransport } from "ai";
import { Response } from "@/components/ai-elements/response";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <main className="flex max-h-svh w-full flex-col items-center gap-10">
      <Conversation className="w-full">
        <ConversationContent className="mx-auto max-w-[50rem]">
          {messages.map((message) => (
            <Message
              key={message.id}
              from={message.role === "user" ? "user" : "assistant"}
            >
              <MessageContent>
                {message.parts.map((part, idx) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Response
                          key={idx}
                        >
                          {part.text}
                        </Response>
                      );

                    default:
                      return null;
                  }
                })}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Loader2Icon className="animate-spin size-5" />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div>
        <AppPromptInput sendMessage={sendMessage} status={status} stop={stop} />

        <p className="text-muted-foreground my-2 text-center text-xs">
          Zyra can make mistakes. Check important info.
        </p>
      </div>
    </main>
  );
}

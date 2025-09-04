"use client";

import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import AppPromptInput from "@/features/chat/ui/app-prompt-input";
import { DefaultChatTransport, UIMessage } from "ai";
import { Response } from "@/components/ai-elements/response";
import { Loader2Icon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Chat({
  id,
  initialMessages,
  firstMessage,
}: {
  id: string;
  initialMessages?: UIMessage[];
  firstMessage?: string;
}) {
  const { messages, sendMessage, status, stop } = useChat({
    id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({ messages, id }) {
        return { body: { message: messages[messages.length - 1], id } };
      },
    }),
  });

  const hasSent = useRef(false);

  useEffect(() => {
    if (firstMessage && !hasSent.current) {
      sendMessage({ text: firstMessage });
      hasSent.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      return <Response key={idx}>{part.text}</Response>;

                    default:
                      return null;
                  }
                })}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && (
            <Loader2Icon className="size-5 animate-spin" />
          )}
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

"use client";

import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputToolbar,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import {
  ChatRequestOptions,
  ChatStatus,
  CreateUIMessage,
  FileUIPart,
  UIMessage,
} from "ai";
import { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";

type InferUIMessageMetadata<T extends UIMessage> =
  T extends UIMessage<infer METADATA> ? METADATA : unknown;

const AppPromptInput = ({
  sendMessage,
  status,
  stop,
}: {
  sendMessage: (
    message:
      | (CreateUIMessage<UIMessage> & {
          text?: never;
          files?: never;
          messageId?: string;
        })
      | {
          text: string;
          files?: FileList | FileUIPart[];
          metadata?: InferUIMessageMetadata<UIMessage>;
          parts?: never;
          messageId?: string;
        }
      | {
          files: FileList | FileUIPart[];
          metadata?: InferUIMessageMetadata<UIMessage>;
          parts?: never;
          messageId?: string;
        },
    options?: ChatRequestOptions,
  ) => Promise<void>;
  status: ChatStatus;
  stop: () => Promise<void>;
}) => {
  const [input, setInput] = useState("");

  return (
    <PromptInput
      onSubmit={(e) => {
        e.preventDefault();
        if (status !== "ready") return;

        if (input.trim()) {
          sendMessage({ text: input });
          setInput("");
        }
      }}
      className="mx-auto w-[45rem]"
    >
      <PromptInputTextarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton>
            <HiOutlineLightBulb /> Search
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit
          onClick={(e) => {
            switch (status) {
              case "streaming":
                {
                  e.preventDefault();
                  stop();
                }
            }
          }}
          status={status}
          disabled={
            (input.trim() === "" && status === "ready") ||
            status === "error" ||
            status === "submitted"
          }
        />
      </PromptInputToolbar>
    </PromptInput>
  );
};
export default AppPromptInput;

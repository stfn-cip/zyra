"use client";

import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputToolbar,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

import { useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { createChatWithFirstMessage } from "../actions";

const NewChatPromptInput = () => {
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);

  return (
    <PromptInput
      action={createChatWithFirstMessage}
      onSubmit={() => setDisabled(true)}
      className="mx-auto w-[45rem]"
    >
      <PromptInputTextarea
        name="prompt"
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
          disabled={disabled}
          status={disabled ? "submitted" : undefined}
        />
      </PromptInputToolbar>
    </PromptInput>
  );
};
export default NewChatPromptInput;

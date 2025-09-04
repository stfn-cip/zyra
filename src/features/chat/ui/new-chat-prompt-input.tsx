"use client";

import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputToolbar,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

import { MouseEvent, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { createChatWithFirstMessage } from "../actions";

const NewChatPromptInput = () => {
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    setDisabled(true);

    const form = e.currentTarget.form;
    if (form) form.requestSubmit();
  };

  return (
    <PromptInput
      action={createChatWithFirstMessage}
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
        <PromptInputSubmit onClick={handleSubmit} disabled={disabled} />
      </PromptInputToolbar>
    </PromptInput>
  );
};
export default NewChatPromptInput;

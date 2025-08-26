import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputToolbar,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { HiOutlineLightBulb } from "react-icons/hi";

const AppPromptInput = () => {
  return (
    <PromptInput className="w-[45rem] mx-auto">
      <PromptInputTextarea />

      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton>
            <HiOutlineLightBulb /> Search
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputToolbar>
    </PromptInput>
  );
};
export default AppPromptInput;

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import AppPromptInput from "@/features/chat/ui/app-prompt-input";

export default function Home() {
  return (
    <main className="flex w-full max-h-svh flex-col items-center gap-10">
      <Conversation className="w-full">
        <ConversationContent className="mx-auto max-w-[45rem]">
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
          <Message from="user">
            <MessageContent>Hello ChatGPT.</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Hello Ciprian. How can I help?</MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div>
        <AppPromptInput />
        <p className="text-muted-foreground my-2 text-center text-xs">
          Zyra can make mistakes. Check important info.
        </p>
      </div>
    </main>
  );
}

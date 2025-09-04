import { getMessages, saveMessage } from "@/features/chat/actions";
import {
  convertToModelMessages,
  createIdGenerator,
  streamText,
  UIMessage,
  validateUIMessages,
} from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export const POST = async (req: Request) => {
  const {
    id: chatId,
    message,
  }: {
    id: string;
      message: UIMessage;
    } = await req.json();
  
  saveMessage(chatId, message);

  const previousMessages = await getMessages(chatId);
  const messages = [...previousMessages, message];

  const validatedMessages = await validateUIMessages({
    messages,
  });

  const result = streamText({
    model: google("gemini-2.5-pro"),
    system: "Your name is Zyra. You are a helpful assistant. Use markdown in your responses.",
    messages: convertToModelMessages(validatedMessages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    generateMessageId: createIdGenerator(),
    onFinish: ({ messages }) => {
      saveMessage(chatId, messages[messages.length - 1]);
    },
  });
};

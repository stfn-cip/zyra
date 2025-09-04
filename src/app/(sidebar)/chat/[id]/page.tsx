import {
  getChat,
  getMessages,
  consumeTempMessage,
} from "@/features/chat/actions";
import Chat from "@/features/chat/ui/chat";
import { notFound } from "next/navigation";
import z from "zod";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ start: string }>;
}) {
  const { id } = await params;
  if (!id) notFound();
  const parseId = z.uuid().safeParse(id);
  if (!parseId.success) notFound();

  getChat(id);
  const initialMessages = await getMessages(id);

  let firstMessage = null;

  if (initialMessages.length === 0) {
    const { start } = await searchParams;
    const parseStart = z.uuid().safeParse(start);
    if (parseStart.success)
      firstMessage = await consumeTempMessage(parseStart.data);
  }

  return (
    <Chat
      id={id}
      initialMessages={initialMessages}
      firstMessage={firstMessage?.content}
    />
  );
}

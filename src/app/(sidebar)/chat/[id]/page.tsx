import {
  getChat,
  getMessages,
  consumeTempMessage,
} from "@/features/chat/actions";
import Chat from "@/features/chat/ui/chat-interface";
import { redirect, RedirectType } from "next/navigation";
import z from "zod";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ start: string }>;
}) {
  const { id } = await params;
  if (!id) redirect("/new-chat", RedirectType.replace);
  const parseId = z.uuid().safeParse(id);
  if (!parseId.success) redirect("/new-chat", RedirectType.replace);

  const data = await getChat(id);
  if (!data) redirect("/new-chat", RedirectType.replace);

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

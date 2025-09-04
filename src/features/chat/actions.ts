"use server";

import { createClient } from "@/lib/supabase/server";
import { generateId, UIMessage } from "ai";
import { chatTypes } from "./types";
import { notFound, redirect } from "next/navigation";
import z from "zod";

export const saveMessage = async (
  chatId: string,
  message: UIMessage,
): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("messages")
    .insert({ chat_id: chatId, ...message });

  if (error) throw new Error(error.message);
};

export const getMessages = async (chatId: string): Promise<UIMessage[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId);
  if (error) throw new Error(error.message);

  return data;
};

export const getChat = async (chatId: string): Promise<chatTypes> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) notFound();

  return data as chatTypes;
};

export const createChatWithFirstMessage = async (formData: FormData) => {
  const prompt = formData.get("prompt");
  const parsePrompt = z.string().parse(prompt);

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error("Unauthenticated user");

  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .insert({ user_id: userData.user.id })
    .select()
    .single();
  if (chatError) throw new Error(chatError.message);

  const { data: temp, error: tempError } = await supabase
    .from("temp_messages")
    .insert({
      user_id: userData.user.id,
      chat_id: chat.id,
      content: parsePrompt.trim(),
    })
    .select("id")
    .single();
  if (tempError) throw new Error(tempError.message);

  redirect(`/chat/${chat.id}?start=${temp.id}`);
};

export const consumeTempMessage = async (
  tempId: string,
): Promise<{ content: string } | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("temp_messages")
    .delete()
    .eq("id", tempId)
    .select("content")
    .maybeSingle();
  if (error) throw new Error(error.message);

  return data;
};

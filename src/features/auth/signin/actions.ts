"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signInSchema } from "@auth/signin/schema";

export const signIn = async (
  prevState: { message: string },
  formData: FormData,
): Promise<{ message: string }> => {
  const unvalidatedData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parse = signInSchema.safeParse(unvalidatedData);

  if (!parse.success) return { message: "Invalid schema" };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parse.data);

  if (error)
    return {
      message: error.message,
    };

  redirect("/new-chat");
};

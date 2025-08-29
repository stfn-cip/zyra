"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signUpSchema } from "@auth/signup/schema";

export const signUp = async (
  prevState: { message: string },
  formData: FormData,
): Promise<{ message: string }> => {
  const unvalidatedData = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
    name: formData.get("name"),
  };

  const parse = signUpSchema.safeParse(unvalidatedData);
  if (!parse.success)
  {
    console.log(JSON.stringify(parse.error, ))
    return {
      message: "Invalid schema",
    };
  }

  const { email, name, password, confirmPassword } = parse.data;

  if (password !== confirmPassword) return { message: "Passwords don't match" };

  const data = {
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error)
    return {
      message: error.message,
    };

  redirect("/new-chat");
};

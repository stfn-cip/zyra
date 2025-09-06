import NewChatPromptInput from "@/features/chat/ui/new-chat-prompt-input";
import { createClient } from "@/lib/supabase/server";

const Page = async () => {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);

  return (
    <main className="flex max-h-svh w-full flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-bold">Welcome back{session && ", " + session.user.user_metadata.name}!</h1>
      <NewChatPromptInput />
    </main>
  );
};
export default Page;

import { signOut } from "@/features/auth/signout/actions";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/ui/button";

const Page = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <p>{data.user?.email}</p>
      <p>{data.user?.user_metadata.name}</p>
      <Button onClick={signOut}>Log out</Button>
    </div>
  );
};
export default Page;

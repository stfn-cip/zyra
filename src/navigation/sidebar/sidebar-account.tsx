import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/features/auth/signout/actions";

const SidebarAccount = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex flex-col">
                <span className="">
                  {data.session?.user.user_metadata.name}
                </span>
                <span className="text-xs text-zinc-400">
                  {data.session?.user.email}
                </span>
              </div>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[var(--radix-popper-anchor-width)]"
          >
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
export default SidebarAccount;

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <DropdownMenuItem variant="destructive" asChild>
        <button type="submit" className="w-full">Sign out</button>
      </DropdownMenuItem>
    </form>
  );
};

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/sidebar";
import { deleteChat, getChats } from "../actions";
import Link from "next/link";
import { Loader2Icon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

export const SidebarChat = async () => {
  const chats = await getChats();

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {chats.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton asChild>
              <Link href={`/chat/${chat.id}`}>
                <span>{chat.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem>
                  <span>Edit Project</span>
                </DropdownMenuItem>
                <DeleteChatButton chatId={chat.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
};

export const SidebarChatSkeleton = () => {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <Loader2Icon className="size-5 animate-spin" />
    </div>
  );
};

const DeleteChatButton = ({ chatId }: { chatId: string }) => {
  const deleteChatWithId = deleteChat.bind(null, chatId);

  return (
    <form action={deleteChatWithId}>
      <DropdownMenuItem variant="destructive" asChild>
        <button type="submit" className="w-full">
          Delete
        </button>
      </DropdownMenuItem>
    </form>
  );
};

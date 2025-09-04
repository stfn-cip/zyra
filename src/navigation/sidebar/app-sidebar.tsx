import {
  SidebarChat,
  SidebarChatSkeleton,
} from "@/features/chat/ui/sidebar-chat";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/ui/sidebar";
import { Suspense } from "react";
import SidebarAccount from "./sidebar-account";
import Link from "next/link";
import { SquarePen } from "lucide-react";

const AppSidebar = async () => {
  return (
    <Sidebar>
      <SidebarTrigger className="absolute -right-10" />
      <SidebarHeader className="ml-4 text-3xl font-bold">Zyra</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/new-chat`}>
                    <SquarePen />
                    <span>New chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <Suspense fallback={<SidebarChatSkeleton />}>
            <SidebarChat />
          </Suspense>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarAccount />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;

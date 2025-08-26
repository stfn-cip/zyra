import AppSidebar from "@/features/navigation/app-sidebar";
import { SidebarProvider } from "@/ui/sidebar";
import { cookies } from "next/headers";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
};
export default Layout;

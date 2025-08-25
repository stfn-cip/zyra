import AppSidebar from "@/features/navigation/app-sidebar";
import { SidebarProvider } from "@/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
};
export default Layout;

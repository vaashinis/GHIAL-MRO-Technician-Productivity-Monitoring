import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="h-5 w-px bg-border" />
              <span className="text-xs text-muted-foreground mono uppercase tracking-wider">
                Hangar 3 — Mumbai MRO Facility
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-4.5 w-4.5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center font-medium">
                  3
                </span>
              </div>
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-medium">Admin User</span>
                  <span className="text-[10px] text-muted-foreground">MRO Manager</span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "../../hooks/use-mobile";
import { cn } from "../../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const isMobile = useIsMobile();

  // Collapse sidebar on mobile by default
  useEffect(() => {
    setSidebarExpanded(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          sidebarExpanded ? "md:ml-64" : "md:ml-20"
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  ShoppingBag,
  Users,
  Package,
  Briefcase,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";
type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: {
    title: string;
    href: string;
  }[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingBag,
    submenu: [
      { title: "All Orders", href: "/orders" },
      { title: "Pending", href: "/orders/pending" },
      { title: "Processing", href: "/orders/processing" },
      { title: "Delivered", href: "/orders/delivered" },
      { title: "Returned", href: "/orders/returned" },
    ],
  },
  {
    title: "Employees",
    href: "/employees",
    icon: Users,
    submenu: [
      { title: "All Employees", href: "/employees" },
      { title: "Performance", href: "/employees/performance" },
    ],
  },
  {
    title: "Sellers",
    href: "/sellers",
    icon: Briefcase,
    submenu: [
      { title: "All Sellers", href: "/sellers" },
      { title: "Performance", href: "/sellers/performance" },
    ],
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const handleSubmenuClick = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar fixed transition-all duration-300 border-r border-sidebar-border z-10",
        expanded ? "w-64" : "w-20"
      )}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div
          className={cn(
            "flex items-center",
            !expanded && "justify-center w-full"
          )}
        >
          {expanded ? (
            <h1 className="text-lg font-bold text-sidebar-foreground">
              OrderFlow
            </h1>
          ) : (
            <div className="h-8 w-8 flex items-center justify-center rounded-md bg-sidebar-primary text-white font-bold">
              O
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                // Item with submenu
                <div className="mb-1">
                  <button
                    onClick={() => handleSubmenuClick(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors",
                      "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      location.pathname.startsWith(item.href) &&
                        "bg-sidebar-accent text-sidebar-foreground font-medium"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon size={20} className="mr-3" />
                      {expanded && <span>{item.title}</span>}
                    </div>
                    {expanded &&
                      (openSubmenu === item.title ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      ))}
                  </button>

                  {expanded && openSubmenu === item.title && (
                    <div className="mt-1 ml-9 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm transition-colors",
                            "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                            location.pathname === subItem.href &&
                              "bg-sidebar-accent/40 text-sidebar-foreground font-medium"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Regular item
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md transition-colors",
                    "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    location.pathname === item.href &&
                      "bg-sidebar-accent text-sidebar-foreground font-medium",
                    !expanded && "justify-center"
                  )}
                >
                  <item.icon size={20} className={cn(expanded && "mr-3")} />
                  {expanded && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

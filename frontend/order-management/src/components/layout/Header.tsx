import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export function Header() {
  const [notifications, setNotifications] = useState(3);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border h-16 flex items-center justify-between px-6">
      {/* Search bar */}
      <div className="w-1/3 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 bg-background" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary text-secondary-foreground">
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                <div className="font-medium">New order received</div>
                <div className="text-sm text-muted-foreground">
                  Order #12345 from Customer A
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  2 minutes ago
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                <div className="font-medium">Low inventory alert</div>
                <div className="text-sm text-muted-foreground">
                  Product XYZ is running low
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  1 hour ago
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                <div className="font-medium">Employee completed training</div>
                <div className="text-sm text-muted-foreground">
                  John Doe completed order processing training
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Yesterday
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.image} alt="User" />
                <AvatarFallback>{user?.username?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              {/* Online status */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="flex flex-col items-center p-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={user?.image || "/placeholder.svg"}
                    alt="User"
                  />
                  <AvatarFallback>{user?.username?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <p className="mt-2 font-semibold text-center">
                {user?.username ?? "Hocine Bouarara"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={logout}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

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

export function Header() {
  const [notifications, setNotifications] = useState(3);

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
            <DropdownMenuItem className="justify-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

"use client";
import React from "react";
import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useUserContext } from "@/components/contextProvider/AppProvider";
import Link from "next/link";
import { handleLogout } from "../functions/handleLogout";

export default function DropDownMenu() {
  const { user, setUser } = useUserContext();

  const handleLogoutClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await handleLogout({ user, setUser });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-yellow-400 text-black p-2 sm:p-3 text-xs sm:text-sm">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none outline-none bg-gray-700 text-yellow-400 mr-2 sm:mr-4 min-w-[120px]">
        <DropdownMenuItem className="text-right text-sm hover:bg-gray-600 cursor-pointer">
          Alerts
        </DropdownMenuItem>
        <DropdownMenuItem className="text-right text-sm hover:bg-gray-600 cursor-pointer">
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="text-right text-sm hover:bg-gray-600 cursor-pointer">
          {user ? (
            <button onClick={handleLogoutClick}>
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

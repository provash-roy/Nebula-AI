"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  conversations: {
    id: string;
    title: string;
  }[];
}

export default function SidebarContentClient({ conversations }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Button
        asChild
        className="w-full bg-linear-to-r from-indigo-500 to-violet-700 hover:opacity-90"
      >
        <Link className="flex gap-2 items-center" href="/">
          <Plus />
          New Chat
        </Link>
      </Button>

      <div className="mt-6 space-y-2">
        <h2 className="px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Recents
        </h2>

        {conversations.map((conversation) => {
          const href = `/c/${conversation.id}`;
          const isActive = pathname === href;

          return (
            <div
              key={conversation.id}
              className="group relative flex items-center"
            >
              <Link
                href={href}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2 pr-10 text-sm transition-colors duration-200",
                  isActive
                    ? "bg-slate-800/60 text-white"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white",
                )}
              >
                <span className="truncate">{conversation.title}</span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="right"
                  align="start"
                  alignOffset={10}
                  className=" border-white/6 backdrop-blur-sm "
                >
                  <DropdownMenuItem
                    onClick={() => console.log("Rename", conversation.id)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => console.log("Delete", conversation.id)}
                    className="text-red-400 focus:text-red-400"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>
    </>
  );
}

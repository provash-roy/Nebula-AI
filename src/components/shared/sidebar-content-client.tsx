"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Conversation {
  id: string;
  title: string;
}

interface Props {
  conversations: Conversation[];
}

export default function SidebarContentClient({ conversations }: Props) {
  const pathname = usePathname();

  const handleRename = (id: string) => {
    console.log("Rename:", id);
    // TODO: open rename dialog
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
    // TODO: call API + optimistic UI update
  };

  return (
    <div className="space-y-6">
      {/* New Chat */}
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-700 px-3 py-2 text-white transition hover:opacity-90"
      >
        <Plus className="h-4 w-4" />
        <span className="text-sm font-medium">New Chat</span>
      </Link>

      {/* Recents */}
      <div className="space-y-2">
        <h2 className="px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Recents
        </h2>

        {conversations.length === 0 ? (
          <p className="px-2 text-sm text-slate-400">No conversations yet</p>
        ) : (
          conversations.map((conversation) => {
            const href = `/c/${conversation.id}`;
            const isActive = pathname === href;

            return (
              <div
                key={conversation.id}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "bg-slate-800/70 text-white"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white",
                )}
              >
                {/* LEFT: Title */}
                <Link href={href} className="flex-1 truncate">
                  {conversation.title}
                </Link>

                {/* RIGHT: Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    side="right"
                    align="start"
                    className="border-white/10 backdrop-blur-md"
                  >
                    <DropdownMenuItem
                      onClick={() => handleRename(conversation.id)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleDelete(conversation.id)}
                      className="text-red-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

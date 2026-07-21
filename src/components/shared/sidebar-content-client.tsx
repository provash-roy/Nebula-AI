"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Conversation {
  id: string;
  title: string;
}

interface Props {
  conversations: Conversation[];
}

export default function SidebarContentClient({ conversations }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const openRename = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setTitle(conversation.title);
    setRenameOpen(true);
  };

  const openDelete = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setDeleteOpen(true);
  };

  const handleRename = async () => {
    if (!selectedConversation) return;

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      setLoading(true);

      await axios.patch(`/api/conversations/${selectedConversation.id}`, {
        title: title.trim(),
      });

      toast.success("Conversation renamed");

      setRenameOpen(false);

      router.refresh();
    } catch {
      toast.error("Rename failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedConversation) return;

    try {
      setLoading(true);

      await axios.delete(`/api/conversations/${selectedConversation.id}`);

      toast.success("Conversation deleted");

      setDeleteOpen(false);

      if (pathname === `/c/${selectedConversation.id}`) {
        router.push("/");
      }

      router.refresh();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-500 to-violet-700 px-3 py-2 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Link>

        <div className="space-y-2">
          <h2 className="px-2 text-xs font-semibold uppercase text-slate-500">
            Recents
          </h2>

          {conversations.map((conversation) => {
            const href = `/c/${conversation.id}`;

            return (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2",
                  pathname === href
                    ? "bg-slate-800 text-white"
                    : "hover:bg-slate-800/60",
                )}
              >
                <Link href={href} className="flex-1 truncate">
                  {conversation.title}
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" side="right" sideOffset={8}>
                    <DropdownMenuItem onClick={() => openRename(conversation)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => openDelete(conversation)}
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
      </div>

      {/* Rename Dialog */}

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Conversation</DialogTitle>

            <DialogDescription>Enter a new title.</DialogDescription>
          </DialogHeader>

          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleRename} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

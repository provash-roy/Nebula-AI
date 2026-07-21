"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RenameConversationDialogProps {
  conversationId: string;
  currentTitle: string;
}

export default function RenameConversationDialog({
  conversationId,
  currentTitle,
}: RenameConversationDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (value: boolean) => {
    if (value) {
      setTitle(currentTitle);
    }

    setOpen(value);
  };

  const handleRename = async () => {
    const newTitle = title.trim();

    if (!newTitle) {
      toast.error("Title cannot be empty.");
      return;
    }

    if (newTitle === currentTitle) {
      setOpen(false);
      return;
    }

    try {
      setLoading(true);

      await axios.patch(`/api/conversations/${conversationId}`, {
        title: newTitle,
      });

      toast.success("Conversation renamed.");

      router.refresh();

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to rename conversation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button variant="ghost" className="w-full justify-start">
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Conversation</DialogTitle>

          <DialogDescription>
            Enter a new title for this conversation.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Conversation title"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }
          }}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button onClick={handleRename} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

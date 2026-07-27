"use client";

import { Show, UserButton, useUser } from "@clerk/nextjs";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { BookOpen } from "lucide-react";
import SidebarContentClient from "./sidebar-content-client";
import { Conversation } from "@/types/conversation";
import { Button } from "@/components/ui/button";

type AppSidebarClientProps = {
  conversations: Conversation[];
  currentUser: {
    plan: {
      name: string;
    };
  };
};

export default function AppSidebarClient({
  conversations,
  currentUser,
}: AppSidebarClientProps) {
  const { user } = useUser();

  return (
    <Sidebar className="bg-[#0d0f14] border-white/10 px-4 py-2">
      <SidebarHeader className="text-2xl font-semibold">
        <div className="flex items-center gap-4">
          <BookOpen />
          <h2>Nebula AI</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarContentClient conversations={conversations} />
      </SidebarContent>

      <SidebarFooter className=" rounded border border-white/10 bg-white/5">
        <Show when="signed-in">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {user?.fullName}
                </span>

                <span className="text-xs text-zinc-400">
                  {currentUser.plan.name}
                </span>
              </div>
            </div>
            <Button
              className="rounded-full border border-white/10 hover:opacity-90"
            >
              Upgrade
            </Button>
          </div>
        </Show>
      </SidebarFooter>
    </Sidebar>
  );
}

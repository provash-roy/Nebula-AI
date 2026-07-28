"use client";

import {
  Show,
  UserButton,
  useUser,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

      <SidebarFooter className="rounded border border-white/10 bg-white/5 p-3">
        <Show when="signed-in">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
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
                  {currentUser?.plan?.name}
                </span>
              </div>
            </div>

            <Button
              className="rounded-full border border-white/10 hover:opacity-90"
              onClick={() => router.push("/pricing")}
            >
              Upgrade
            </Button>
          </div>
        </Show>

        <Show when="signed-out">
          <div className="flex items-center justify-between">
            <SignInButton mode="modal">
              <Button
              size='lg'
                variant="outline"
                className="rounded border-white/10 text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button className=" rounded bg-blue-500 hover:bg-blue-600">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </Show>
      </SidebarFooter>
    </Sidebar>
  );
}

import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 z-50 flex items-center bg-[#0d0f14] border-b border-white/8 justify-between p-4 h-16">
      <SidebarTrigger />
      {/* <Show when="signed-out">
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </Show> */}

      <Show when="signed-in">
        <UserButton />
      </Show>
    </header>
  );
}

import { Show, UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  );
}

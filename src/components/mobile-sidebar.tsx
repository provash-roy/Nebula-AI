import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Navbar from "../components/navbar"

export default function MobileSidebar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Navbar />
        </SheetContent>
      </Sheet>
    </div>
  );
}

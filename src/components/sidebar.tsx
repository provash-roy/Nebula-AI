import { cn } from "@/lib/utils";
import {
  Code,
  Image,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from "lucide-react";

import Link from "next/link";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-blue-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-sky-500",
  },
  {
    label: "Image Generation",
    icon: Image,
    href: "/image-generation",
    color: "text-purple-500",
  },
  {
    label: "Audio Generation",
    icon: MusicIcon,
    href: "/audio-generation",
    color: "text-green-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video-generation",
    color: "text-pink-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code-generation",
    color: "text-blue-500",
  },
  {
    label: "Setting",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-white-500",
  },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-col h-screen w-64 bg-gray-900 text-white p-5 shadow-lg">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <LayoutDashboard size={26} />
        <h2 className="text-2xl font-bold tracking-wide">Nebula</h2>
      </Link>

      <nav className="flex flex-col gap-2">
        {routes.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-gray-700"
            >
              <Icon className={cn("h-5 w-5", item.color)} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

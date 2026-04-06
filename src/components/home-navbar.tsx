"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HomeNavbar() {
  const isSignedIn = useAuth();
  return (
    <nav className="flex items-center p-4 mx-auto max-w-7xl">
      <Link href="/" className="text-white text-xl font-bold">
        Nebula
      </Link>
      <div className="flex w-full justify-end">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="outline" size="sm">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}

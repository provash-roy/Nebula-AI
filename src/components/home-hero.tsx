"use client";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { Button } from "./ui/button";

export default function HomeHero() {
  return (
    <div>
      <div className="flex items-center justify-center py-36">
        <div className="text-white font-extrabold text-2xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
          <h1>The Best AI Tool For</h1>

          <div className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <Typewriter
              options={{
                strings: [
                  "Conversation",
                  "Photo Generation",
                  "Code Generation",
                  "Audio Generation",
                  "Video Generation",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>

          <div className="mt-4 text-base md:text-xl font-light text-gray-200">
            Create Content Using AI 10x Faster
          </div>
          <div>
            <Link href="/sign-up">
              <Button className="text-white">Start Generating For Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

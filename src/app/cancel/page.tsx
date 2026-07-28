import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-zinc-950
      px-6
      text-white
    "
    >
      <div
        className="
        max-w-md
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-10
        text-center
      "
      >
        <XCircle
          size={64}
          className="
            mx-auto
            text-red-400
          "
        />

        <h1
          className="
          mt-6
          text-3xl
          font-bold
        "
        >
          Payment Cancelled
        </h1>

        <p
          className="
          mt-4
          text-zinc-400
        "
        >
          Your payment was cancelled. You can try again whenever you want.
        </p>

        <Link href="/pricing">
          <Button
            className="
              mt-8
              w-full
              rounded-xl
              bg-zinc-800
              hover:bg-zinc-700
            "
          >
            Back to Pricing
          </Button>
        </Link>
      </div>
    </div>
  );
}

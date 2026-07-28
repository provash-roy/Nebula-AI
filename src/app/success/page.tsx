import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
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
        <CheckCircle size={64} className="mx-auto text-green-400" />

        <h1
          className="
          mt-6
          text-3xl
          font-bold
        "
        >
          Payment Successful 🎉
        </h1>

        <p
          className="
          mt-4
          text-zinc-400
        "
        >
          Your plan has been upgraded successfully. Your AI credits are now
          available.
        </p>

        <Link href="/">
          <Button
            className="
              mt-8
              w-full
              rounded-xl
              bg-blue-500
              hover:bg-blue-600
            "
          >
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

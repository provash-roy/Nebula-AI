"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  popular?: boolean;
  button: string;
};

export default function PlanButton({
  plan,
  isCurrent,
}: {
  plan: Plan;
  isCurrent: boolean;
}) {
  const handleClick = async () => {
    try {
      const res = await axios.post("/api/checkout", {
        planName: plan.name,
      });

      window.location.href = res.data.url;

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      disabled={isCurrent}
      onClick={handleClick}
      className={`
mt-8 block w-full rounded-xl
px-4 py-3 text-center
text-sm font-medium transition

${
  isCurrent
    ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
    : plan.popular
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-zinc-800 hover:bg-zinc-700"
}

`}
    >
      {isCurrent ? "Current Plan" : plan.button}
    </Button>
  );
}

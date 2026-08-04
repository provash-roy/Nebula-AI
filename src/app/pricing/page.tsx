import { Check } from "lucide-react";
import { getCurrentUser } from "../../actions/get-current-user";
import PlanButton from "./plan-button";

const plans = [
  {
    name: "FREE",
    price: "$0",
    description: "Try Nebula AI with basic features.",
    credits: "50 AI credits",
    features: ["50 AI generations", "Basic AI assistant"],
    button: "Get Started",
    popular: false,
  },

  {
    name: "STARTER",
    price: "$10",
    description: "For developers building with AI.",
    credits: "500 AI credits",
    features: ["500 AI generations", "Faster responses"],
    button: "Upgrade Starter",
    popular: false,
  },

  {
    name: "PRO",
    price: "$25",
    description: "For professionals and heavy users.",
    credits: "2000 AI credits",
    features: ["2000 AI generations", "Highest priority"],
    button: "Upgrade Pro",
    popular: true,
  },
];

export default async function PricingPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Choose the plan that fits you
        </h1>

        <p className="mt-4 text-zinc-400">
          Unlock the power of Nebula AI with flexible plans.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`
        relative rounded-2xl border p-8
        ${
          plan.popular
            ? "border-blue-500 bg-zinc-900"
            : "border-zinc-800 bg-zinc-950"
        }
        `}
          >
            {plan.popular && (
              <span
                className="
            absolute -top-3 left-1/2
            -translate-x-1/2 rounded-full
            bg-blue-500 px-4 py-1 text-xs
            "
              >
                Most Popular
              </span>
            )}

            <h2 className="text-xl font-semibold">{plan.name}</h2>

            <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>

            <div className="mt-6 text-4xl font-bold">{plan.price}</div>

            <div className="mt-4 rounded-lg bg-zinc-900 px-4 py-3 text-blue-400">
              {plan.credits}
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-zinc-300">
                  <Check size={18} className="text-green-400" />

                  {feature}
                </li>
              ))}
            </ul>

            <PlanButton
              plan={plan}
              isCurrent={currentUser?.plan?.name === plan.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

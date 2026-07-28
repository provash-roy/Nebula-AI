import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { planName } = body;

    const plan = await prisma.plan.findUnique({
      where: {
        name: planName,
      },
    });

    if (!plan) {
      return NextResponse.json(
        {
          error: "Plan not found",
        },
        {
          status: 404,
        },
      );
    }



    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: plan.name,
              description: `${plan.credits} AI credits`,
            },

            unit_amount: Math.round(plan.price * 100),
          },

          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,

      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancel=true`,

      metadata: {
        userId,

        planId: plan.id,
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}

import stripe from "@/utils/stripe";
import { handleWebhooksEvents } from "@/utils/stripe/webhookEvents";
import { headers } from "next/headers";

export const POST = async (request) => {
  const body = await request.text();
  const sig = headers().get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_ENDPOINT_SECRET;
  let event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook Not Provided", { status: 500 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    let webhook = await handleWebhooksEvents(event);
    if (webhook?.status === "success") {
      return new Response("User Created Successfully", { status: 200 });
    } else {
      return new Response("Not User Created", { status: 500 });
    }
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
};

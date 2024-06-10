import stripe from "@/utils/stripe";

export const POST = async (
  /** @type {{ json: () => any; }} */ request,
  { params }
) => {
  const req = await request.json();
  let { email, price } = req;
  try {
    // @ts-ignore
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Personalized Card", // Change to your product name
            },
            unit_amount: `${price}00`, // Change to your product price in cents
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      mode: "payment",
      billing_address_collection: "required",
      metadata: {
        ...req.cardInfo,
      },
      success_url: process.env.HOST_URL,
      cancel_url: process.env.HOST_URL,
    });

    return new Response(JSON.stringify(session.url), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};

import stripe from "stripe";

const stripeInstance = stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { amount } = JSON.parse(req.body);
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

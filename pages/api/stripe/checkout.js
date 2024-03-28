import Stripe from "stripe";
import Order from "@/models/order";
import { connectToDb } from "@/utils/db";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decodedToken: >>>>>>>", decodedToken);
  if (!decodedToken || !decodedToken.userId) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  const { items, total } = req.body;
  // console.log({ items, total });

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        images: [item.imageUrl],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    // const order = await Order.create({
    //   user: decodedToken.userId,
    //   items,
    //   total,
    // });
    // console.log("created order: >>>>>>>>", order);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout?canceled=1`,
    });
    console.log("session: >>>>>>>>", session);

    res.status(200).json({
      message: "Payment successful",
      redirectUrl: session.url,
    });
  } catch (error) {
    console.log("error: >>>>>>>>", error);
    res
      .status(400)
      .json({ message: "Error: could not process payment and create order" });
  }
}

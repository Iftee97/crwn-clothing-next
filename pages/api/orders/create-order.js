import Order from "@/models/order";
import { connectToDb } from "@/utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken || !decodedToken.userId) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  try {
    await connectToDb();
    const { user, items, total } = req.body;

    if (items && items.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }
    if (!user) {
      res.status(400);
      throw new Error("Not Authorized");
    }

    const order = new Order({
      user: decodedToken.userId || user,
      items,
      total,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(404).json({ message: "Error: could not create order" });
  }
}

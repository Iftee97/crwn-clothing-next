import Order from "@/models/order";
import { connectToDb } from "@/utils/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { authorization } = req.headers;
  // console.log({ authorization });
  if (!authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { userId } = decoded;
  if (!userId) {
    return res.status(401).json({ error: "Invalid Token -- not authorized" });
  }

  try {
    await connectToDb();
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: "Error: could not get orders" });
  }
}

import Product from "@/models/product";
import { connectToDb } from "@/utils/db";

export default async function handler(req, res) {
  try {
    await connectToDb();
    const { title } = req.query;
    const product = await Product.findOne({ title });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

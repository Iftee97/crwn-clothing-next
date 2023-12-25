import Product from "@/models/product";
import { connectToDb } from "@/utils/db";

export default async function handler(req, res) {
  try {
    await connectToDb();
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

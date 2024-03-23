import Product from "@/models/product";
import { connectToDb } from "@/utils/db";

export default async function handler(req, res) {
  try {
    await connectToDb();
    const { id } = req.query;
    const product = await Product.findById(id);
    console.log("product: >>>>>>>", product);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

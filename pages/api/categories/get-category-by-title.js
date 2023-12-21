import Category from "@/models/category";
import Product from "@/models/product";
import { connectToDb } from "@/utils/db";

export default async function handler(req, res) {
  try {
    await connectToDb();
    const { title } = req.query;
    const category = await Category.findOne({ title }).populate({
      path: "items",
      model: "Product",
    });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

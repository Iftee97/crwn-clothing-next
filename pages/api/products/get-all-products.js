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

// // the same API that handles pagination
/* 
import Product from "@/models/product";
import { connectToDb } from "@/utils/db";

export default async function handler(req, res) {
  try {
    await connectToDb();

    // Extract query parameters for pagination
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate page and limit values
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({ message: "Invalid page or limit parameters" });
    }

    // Calculate the skip value for MongoDB query
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch products with pagination
    const products = await Product.find({}).skip(skip).limit(limitNumber);

    res.status(200).json({ products, page: pageNumber, limit: limitNumber });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
*/

// // example implementation from frontend for the paginated api:
/* 
import { useState, useEffect } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [page, limit]);

  return (
    <div>
      <h1>Product List</h1>

      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>

      <div>
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous Page</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>Next Page</button>
      </div>
    </div>
  );
};
*/

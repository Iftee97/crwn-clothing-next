import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

export default function Category() {
  const [category, setCategory] = useState({});
  const [categoryLoading, setCategoryLoading] = useState(false);
  const router = useRouter();
  const { category: categoryTitle } = router.query;

  useEffect(() => {
    if (categoryTitle) {
      document.title = `${categoryTitle} | Crwn Clothing`;
      getCategoryByTitle(categoryTitle);
    }
  }, [categoryTitle]);

  async function getCategoryByTitle(title) {
    if (!title) return;
    try {
      setCategoryLoading(true);
      const res = await fetch(
        `/api/categories/get-category-by-title?title=${title}`
      );
      const data = await res.json();
      setCategory(data.category);
    } catch (error) {
      console.log("error: >>>>>>>>>", error);
    } finally {
      setCategoryLoading(false);
    }
  }

  let content = null;
  if (categoryLoading) {
    content = <h2 className="text-center text-2xl font-medium">Loading...</h2>;
  }
  if (!categoryLoading && category?.items?.length === 0) {
    content = <h2 className="text-2xl font-medium">No items found.</h2>;
  }
  if (!categoryLoading && category?.items?.length > 0) {
    content = category.items.map((item) => (
      <div key={item._id} className="mb-[24px]">
        <ProductCard categoryTitle={categoryTitle} product={item} />
      </div>
    ));
  }

  return (
    <>
      <Head>
        <title>
          {categoryTitle
            ? `${categoryTitle} | Crwn Clothing`
            : "Shop | Crwn Clothing"}
        </title>
      </Head>

      <h2 className="category-title text-[36px] mb-[24px] text-center">
        {categoryTitle?.toUpperCase()}
      </h2>
      <div className="category-container grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[16px] lg:grid-cols-4 gap-x-[0] lg:gap-x-[20px]">
        {content}
      </div>
    </>
  );
}

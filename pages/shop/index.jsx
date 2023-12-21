import Head from "next/head";
import { useEffect, useState } from "react";
import CategoryPreview from "@/components/CategoryPreview";

export default function Shop() {
  // { categories }
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      setCategoriesLoading(true);
      const res = await fetch(`/api/categories/get-categories-with-items`);
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.log("error: >>>>>>>>>", error);
    } finally {
      setCategoriesLoading(false);
    }
  }

  let content = null;
  if (categoriesLoading) {
    content = <h2 className="text-2xl font-medium">Loading...</h2>;
  }
  if (!categoriesLoading && categories?.length > 0) {
    content = categories.map((category) => (
      <CategoryPreview key={category._id} category={category} />
    ));
  }

  return (
    <>
      <Head>
        <title>Shop | Crwn Clothing</title>
      </Head>

      <div className="shop-container flex flex-col">{content}</div>
    </>
  );
}

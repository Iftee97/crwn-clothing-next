import Head from "next/head";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import getBase64 from "@/utils/getLocalBase64";

export default function Category({ category }) {
  const pageTitle = `${category.title} | Crwn Clothing`;

  const [isRevalidating, setIsRevalidating] = useState(false);

  const triggerOnDemandRevalidation = async (title) => {
    const secret = "1767a0d4f434f009817cd49823dddea4";

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/revalidate?secret=${secret}&category=${title}`;

    try {
      setIsRevalidating(true);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to trigger revalidation: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Revalidation response: >>>>>>>", data);
    } catch (error) {
      setIsRevalidating(false);
      console.error("Error triggering revalidation: >>>>>>", error.message);
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <h1 className="category-title text-[36px] mb-[24px] text-center">
        {category.title.toUpperCase()}
      </h1>
      <div className="category-container grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[16px] lg:grid-cols-4 gap-x-[0] lg:gap-x-[20px]">
        {category.items.map((item) => (
          <div key={item._id} className="mb-[24px]">
            <ProductCard categoryTitle={category.title} product={item} />
          </div>
        ))}
      </div>
      <button
        onClick={() => triggerOnDemandRevalidation(category.title)}
        disabled={isRevalidating}
        className="text-sm text-white py-2 px-3 bg-red-500"
      >
        {isRevalidating ? "Revalidating..." : "Revalidate"}
      </button>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-categories-only`
  );
  const { categories } = await res.json();

  const paths = categories.map((category) => ({
    params: { category: category.title },
  }));

  return {
    paths,
    // fallback: false, // return 404 for pages that don't exist
    fallback: "blocking", // ssr pages on-demand if pages don't exist
  };
}

export async function getStaticProps({ params }) {
  const { category } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-category-by-title?title=${category}`
  );
  const { category: categoryData } = await response.json();

  // Iterate through items array in categoryData and add blurDataURL property using item.imageUrl
  for (const item of categoryData.items) {
    const blurDataURL = await getBase64(item.imageUrl);
    item.blurDataURL = blurDataURL;
  }

  return {
    props: {
      category: categoryData,
    },
    revalidate: 10,
  };
}

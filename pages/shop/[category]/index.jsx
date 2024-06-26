import Head from "next/head";
import ProductCard from "@/components/ProductCard";

export default function Category({ category }) {
  const pageTitle = `${category.title} | Crwn Clothing`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <h1 className="text-[36px] mb-[24px] text-center">
        {category.title.toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[16px] lg:grid-cols-4 gap-x-[0] lg:gap-x-[20px]">
        {category.items.map((item) => (
          <div key={item._id} className="mb-[24px]">
            <ProductCard categoryTitle={category.title} product={item} />
          </div>
        ))}
      </div>
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

  return {
    props: {
      category: categoryData,
    },
  };
}

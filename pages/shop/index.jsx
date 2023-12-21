import Head from "next/head";
import CategoryPreview from "@/components/CategoryPreview";

export default function Shop({ categories }) {
  return (
    <>
      <Head>
        <title>Shop | Crwn Clothing</title>
      </Head>

      <div className="shop-container flex flex-col">
        {categories.map((category) => (
          <CategoryPreview key={category._id} category={category} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-categories-with-items`
  );
  const { categories } = await res.json();

  return {
    props: {
      categories,
    },
  };
}

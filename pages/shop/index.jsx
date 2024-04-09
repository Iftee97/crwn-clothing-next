import Head from "next/head";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function Shop({ categories }) {
  return (
    <>
      <Head>
        <title>Shop | Crwn Clothing</title>
      </Head>

      <div className="flex flex-col gap-6">
        {categories.map(({ title, items: products }) => (
          <div className="flex flex-col mb-[18px] lg:mb-[36px]">
            <h2 className="text-[28px] mb-3">
              <Link href={`/shop/${title}`}>{title.toUpperCase()}</Link>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[16px] lg:grid-cols-4 gap-y-[12px] lg:gap-y-[0] gap-x-[0] lg:gap-x-[20px]">
              {products?.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-categories-with-items`,
  );
  const { categories } = await response.json();

  return {
    props: {
      categories,
    },
  };
}

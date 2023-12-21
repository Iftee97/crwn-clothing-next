import Head from "next/head";
import CategoryPreview from "@/components/CategoryPreview";
import getBase64 from "@/utils/getLocalBase64";

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-categories-with-items`
  );
  const { categories } = await response.json();

  // Iterate through items array in categories and add blurDataURL property using item.imageUrl
  for (const category of categories) {
    for (const item of category.items) {
      const blurDataURL = await getBase64(item.imageUrl);
      item.blurDataURL = blurDataURL;
    }
  }

  return {
    props: {
      categories,
    },
  };
}

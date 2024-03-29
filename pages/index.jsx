import Head from "next/head";
import CategoryItem from "@/components/CategoryItem";
// import getBase64 from "@/utils/getLocalBase64";

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Home | Crwn Clothing</title>
      </Head>

      <main>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:gap-0 flex-wrap justify-between">
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
      </main>
    </>
  );
}

// SSR: getServerSideProps | SSG: getStaticProps
export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-categories-only`
  );
  const { categories } = await response.json();

  // // Iterate through categories and add blurDataURL property
  // for (const category of categories) {
  //   const blurDataURL = await getBase64(category.imageUrl);
  //   category.blurDataURL = blurDataURL;
  // }

  return {
    props: {
      categories,
    },
  };
}

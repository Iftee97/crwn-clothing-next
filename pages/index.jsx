import Head from "next/head";
import CategoryItem from "@/components/CategoryItem";

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Home | Crwn Clothing</title>
      </Head>

      <main>
        <div className="w-full flex flex-wrap justify-between gap-4 lg:gap-0">
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
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-categories-only`,
  );
  const { categories } = await response.json();

  return {
    props: {
      categories,
    },
  };
}

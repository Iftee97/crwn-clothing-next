import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// SSR: getServerSideProps | SSG: getStaticProps
export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get-categories-only`
  );
  const { categories } = await response.json();

  return {
    props: {
      categories,
    },
  };
}

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Home | Crwn Clothing</title>
      </Head>

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {categories.slice(0, 3).map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {categories.slice(3, 5).map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
      </main>
    </>
  );
}

function CategoryItem({ category }) {
  return (
    <Link
      key={category._id}
      href={`/shop/${category.title}`}
      className="h-60 flex items-center justify-center border border-black overflow-hidden relative"
    >
      <Image
        src={category.imageUrl}
        alt={category.title}
        width={500}
        height={500}
        className="w-full h-full object-cover hover:transition-transform hover:delay-0 hover:ease-[cubic-bezier(0.25, 0.45, 0.45, 0.95)] hover:scale-110 hover:duration-[3500ms] hover:opacity-90"
      />
      <div className="h-[72px] p-[18px] flex flex-col items-center justify-center absolute border border-black bg-white opacity-70 group-hover:opacity-90">
        <h2 className="font-medium mb-1 text-lg text-gray-700">
          {category.title}
        </h2>
        <p className="font-light text-base text-center">Shop Now</p>
      </div>
    </Link>
  );
}

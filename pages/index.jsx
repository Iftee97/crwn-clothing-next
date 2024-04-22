import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// import CategoryItem from "@/components/CategoryItem";

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Home | Crwn Clothing</title>
      </Head>

      <main>
        {/* <div className="w-full flex flex-wrap justify-between gap-4 lg:gap-0">
          {categories.map((category) => (
            // <CategoryItem key={category._id} category={category} />
            <Link
              href={`/shop/${category.title}`}
              className="h-60 flex flex-auto items-center justify-center border border-black overflow-hidden mx-0 lg:m-2"
            >
              <Image
                src={category.imageUrl}
                alt={category.title}
                width={500}
                height={500}
                className="w-full h-full object-cover hover:transition-transform hover:delay-0 hover:ease-[custom-cubic] hover:scale-110 hover:duration-[3500ms] hover:opacity-90"
              />
              <div className="h-[72px] lg:h-[90px] p-[18px] lg:p-[24px] flex flex-col items-center justify-center absolute border border-black bg-white opacity-70 group-hover:opacity-90">
                <h2 className="font-medium mb-1 text-lg text-gray-700">
                  {category.title}
                </h2>
                <p className="font-light text-base">Shop Now</p>
              </div>
            </Link>
          ))}
        </div> */}

        {/* first 3 category items in a grid cols 3, the last 2 on a grid cols 2 instead of flex and flex wrap */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category._id}
              href={`/shop/${category.title}`}
              className="h-60 flex flex-auto items-center justify-center border border-black overflow-hidden"
            >
              <Image
                src={category.imageUrl}
                alt={category.title}
                width={500}
                height={500}
                className="w-full h-full object-cover hover:transition-transform hover:delay-0 hover:ease-[custom-cubic] hover:scale-110 hover:duration-[3500ms] hover:opacity-90"
              />
              <div className="h-[72px] p-[18px] flex flex-col items-center justify-center absolute border border-black bg-white opacity-70 group-hover:opacity-90">
                <h2 className="font-medium mb-1 text-lg text-gray-700">
                  {category.title}
                </h2>
                <p className="font-light text-base">Shop Now</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {categories.slice(3, 5).map((category) => (
            <Link
              key={category._id}
              href={`/shop/${category.title}`}
              className="h-60 flex flex-auto items-center justify-center border border-black overflow-hidden"
            >
              <Image
                src={category.imageUrl}
                alt={category.title}
                width={500}
                height={500}
                className="w-full h-full object-cover hover:transition-transform hover:delay-0 hover:ease-[custom-cubic] hover:scale-110 hover:duration-[3500ms] hover:opacity-90"
              />
              <div className="h-[72px] p-[18px] flex flex-col items-center justify-center absolute border border-black bg-white opacity-70 group-hover:opacity-90">
                <h2 className="font-medium mb-1 text-lg text-gray-700">
                  {category.title}
                </h2>
                <p className="font-light text-base">Shop Now</p>
              </div>
            </Link>
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

  return {
    props: {
      categories,
    },
  };
}

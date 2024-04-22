import Head from "next/head";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
  },
  {
    id: 2,
    title: "Jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
  },
  {
    id: 3,
    title: "Sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
  },
  {
    id: 4,
    title: "Womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
  },
  {
    id: 5,
    title: "Mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Crwn Clothing</title>
      </Head>

      <main>
        <div className="w-full flex flex-wrap justify-between gap-4">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </main>
    </>
  );
}

function CategoryItem({ category }) {
  return (
    <Link
      href={`/shop/${category.title}`}
      className="min-w-[30%] h-[240px] flex flex-auto items-center justify-center border border-black overflow-hidden hover:cursor-pointer relative"
    >
      <div
        className="w-[100%] h-[100%] bg-cover bg-center over:transition-transform hover:delay-0 hover:ease-[cubic-bezier(0.25, 0.45, 0.45, 0.95)] hover:scale-110 hover:duration-[3500ms] hover:opacity-90"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
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

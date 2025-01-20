import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import HATS_PUBLIC from "../public/hats.png";
import JACKETS_PUBLIC from "../public/jackets.png";
import SNEAKERS_PIBLIC from "../public/sneakers.png";
import WOMENS_PUBLIC from "../public/womens.png";
import MENS_PUBLIC from "../public/mens.png";

const categories = [
  {
    id: 1,
    title: "Hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    publicImageUrl: HATS_PUBLIC,
  },
  {
    id: 2,
    title: "Jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    publicImageUrl: JACKETS_PUBLIC,
  },
  {
    id: 3,
    title: "Sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    publicImageUrl: SNEAKERS_PIBLIC,
  },
  {
    id: 4,
    title: "Womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    publicImageUrl: WOMENS_PUBLIC,
  },
  {
    id: 5,
    title: "Mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    publicImageUrl: MENS_PUBLIC,
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
    <>
      {/* <CategoryItemUsingBackgroundImage category={category} /> */}
      <CategoryItemUsingNextImage category={category} usePublicImage={true} />
    </>
  );
}

function CategoryItemUsingNextImage({ category, usePublicImage }) {
  return (
    <CategoryItemShell title={category.title}>
      <Image
        src={usePublicImage ? category.publicImageUrl : category.imageUrl}
        alt={category.title}
        width={300}
        height={300}
        placeholder={usePublicImage ? "blur" : "empty"}
        // className="hover:transition-transform hover:delay-0 hover:ease-[cubic-bezier(0.25, 0.45, 0.45, 0.95)] hover:scale-110 hover:duration-[3500ms] hover:opacity-90 w-full h-full lg:h-auto"
        className="w-full h-full lg:h-auto hover:opacity-90" // without shitty hover animation
      />
    </CategoryItemShell>
  );
}

function CategoryItemUsingBackgroundImage({ category }) {
  return (
    <CategoryItemShell title={category.title}>
      <div
        className="w-[100%] h-[100%] bg-cover bg-center over:transition-transform hover:delay-0 hover:ease-[cubic-bezier(0.25, 0.45, 0.45, 0.95)] hover:scale-110 hover:duration-[3500ms] hover:opacity-90"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
    </CategoryItemShell>
  );
}

function CategoryItemShell({ title, children }) {
  return (
    <Link
      href={`/shop/${title}`}
      className="min-w-full lg:min-w-[30%] h-[240px] flex flex-auto items-center justify-center border border-black overflow-hidden hover:cursor-pointer relative aspect-[4/3]"
    >
      <Fragment>{children}</Fragment>
      <div className="h-[72px] p-[18px] flex flex-col items-center justify-center absolute border border-black bg-white opacity-70 group-hover:opacity-90">
        <h2 className="font-medium mb-1 text-lg text-gray-700">{title}</h2>
        <p className="font-light text-base text-center">Shop Now</p>
      </div>
    </Link>
  );
}

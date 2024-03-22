import Link from "next/link";
import Image from "next/image";

export default function CategoryItem({ category }) {
  return (
    <Link
      href={`/shop/${category.title}`}
      // min-w-[30%]
      className="category-item-container h-60 flex flex-auto items-center justify-center border border-black overflow-hidden mx-0 lg:m-2"
    >
      {/* The width and height attributes are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. The width and height do not determine the rendered size of the image file. */}
      <Image
        src={category.imageUrl}
        alt={category.title}
        width={500}
        height={500}
        placeholder="blur"
        blurDataURL={category.blurDataURL}
        className="w-full h-full object-cover hover:transition-transform hover:delay-0 hover:ease-[custom-cubic] hover:scale-110 hover:duration-[3500ms] hover:opacity-90"
      />
      <div className="h-[72px] lg:h-[90px] p-[18px] lg:p-[24px] flex flex-col items-center justify-center absolute border border-black bg-white opacity-70 group-hover:opacity-90">
        <h2 className="font-medium mb-1 text-lg text-gray-700">
          {category.title}
        </h2>
        <p className="font-light text-base">Shop Now</p>
      </div>
    </Link>
  );
}

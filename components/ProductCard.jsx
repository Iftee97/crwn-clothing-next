import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { imageUrl, title, price } = product;

  return (
    <Link href={`/products/${title}`}>
      <div className="w-full flex flex-col items-center h-[350px] relative mb-[28px]">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover mb-[6px] hover:opacity-80"
        />
        <div className="w-full h-[5%] flex justify-between text-[18px]">
          <span>{title}</span>
          <span>${price}</span>
        </div>
      </div>
    </Link>
  );
}

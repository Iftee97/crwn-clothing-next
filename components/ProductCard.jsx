import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { imageUrl, title, price } = product;

  return (
    <Link href={`/products/${title}`} className="flex flex-col gap-2">
      <div className="w-full h-[350px] bg-gray-50 relative">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover mb-[6px] hover:opacity-80"
        />
      </div>
      <div className="w-full h-[5%] flex justify-between text-[18px]">
        <span>{title}</span>
        <span>${price}</span>
      </div>
    </Link>
  );
}

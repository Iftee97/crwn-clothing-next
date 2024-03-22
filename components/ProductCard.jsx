import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ categoryTitle, product }) {
  const { imageUrl, title, price } = product;

  return (
    <Link href={`/shop/${categoryTitle}/${title}`}>
      <div className="product-card-container w-full flex flex-col items-center h-[350px] relative mb-[28px]">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover mb-[6px] hover:opacity-80"
        />
        <div className="details w-full h-[5%] flex justify-between text-[18px]">
          <span className="name">{title}</span>
          <span className="price">${price}</span>
        </div>
      </div>
    </Link>
  );
}

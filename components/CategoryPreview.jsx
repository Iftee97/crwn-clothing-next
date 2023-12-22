import Link from "next/link";
import ProductCard from "./ProductCard";

export default function CategoryPreview({ category }) {
  const { title, items: products } = category;

  return (
    <div className="category-preview-container flex flex-col mb-[18px] lg:mb-[36px]">
      <h2 className="title text-[28px] mb-[18px] lg:mb-[24px]">
        <Link href={`/shop/${title}`}>{title.toUpperCase()}</Link>
      </h2>
      <div className="preview grid grid-cols-1 sm:grid-cols-2 sm:gap-x-[16px] lg:grid-cols-4 gap-y-[12px] lg:gap-y-[0] gap-x-[0] lg:gap-x-[20px]">
        {products?.slice(0, 4).map((product) => (
          <ProductCard
            key={product._id}
            categoryTitle={title}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

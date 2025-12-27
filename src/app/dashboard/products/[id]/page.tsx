import { Product, ProductsResponse } from "@/app/types/Product";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Type data untuk halaman dynamic
interface PageProp {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProp) {
  const productId = (await params).id;
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const product: Product = await res.json();
  return (
    <div>
      <div className="flex items-center gap-x-3 mb-3">
        <Link href="/dashboard/products">
          <ArrowLeft />
        </Link>
        <h1 className="font-bold text-2xl">Detail Product</h1>
      </div>
      <div>
        {product && (
          <div className="p-6 border border-neutral-800 bg-neutral-900  rounded-lg hover:bg-neutral-800  transition space-y-2 max-w-2xl">
            {/* <img
              alt="thumbnail"
              src={product.thumbnail}
              className="object-cover w-40 h-40 mb-4"
            /> */}
            {/* <h2 className="text-lg font-semibold">{product.title}</h2>
            <p>Price: {product.price}</p>
            <p className="text-neutral-400">{product.description}</p> */}
          </div>
        )}
      </div>
    </div>
  );
}

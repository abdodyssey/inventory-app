import AddToCartButton from "@/app/components/addToCartButton";
import { Product } from "@/app/types/Product";
import Link from "next/link";
import SubmitButton from "@/app/components/SubmitButton";
import { db } from "@/db/client";
import { addProduct, deleteProduct } from "./actions";
import DeleteProductButton from "@/app/components/deleteProductButton";
import { auth } from "@/auth";

export default async function ProductsPage() {
  //   const res = await fetch("https://dummyjson.com/products?limit=5");
  //   const data: ProductsResponse = await res.json();
  //   const products: Product[] = data.products;

  const session = await auth();
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId: session?.user?.id },
  });

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Manage products</h1>

      <form action={addProduct} className="mb-4 space-x-4 flex">
        <input
          type="text"
          name="productName"
          placeholder="Nama barang"
          className="p-2 border border-neutral-900 flex-1"
        />
        <input
          type="number"
          name="price"
          placeholder="Harga"
          className="p-2 border border-neutral-900 rounded w-32"
        />
        <SubmitButton />
      </form>

      <div className="grid gap-4">
        {products.map((item: Product) => (
          <div
            key={item.id}
            className="flex  justify-between items-center  p-4 hover:translate-x-[-2px] hover:bg-neutral-900 hover:cursor-pointer hover:translate-y-[-2px] border border-neutral-800 rounded-lg shadow-sm hover:shadow-md transition "
          >
            <Link href={`products/${item.id}`}>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-neutral-600 text-sm">{item.price}</p>
            </Link>
            <div className="flex gap-3">
              <AddToCartButton productName={item.name} />
              <DeleteProductButton id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

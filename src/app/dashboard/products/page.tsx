import AddToCartButton from "@/app/components/addToCartButton";
import { Product } from "@/app/types/Product";
import Link from "next/link";
import SubmitButton from "@/app/components/SubmitButton";
import { db } from "@/db/client";
import { addProduct } from "./actions";
import DeleteProductButton from "@/app/components/deleteProductButton";
import { auth } from "@/auth";

export default async function ProductsPage() {
  //   const res = await fetch("https://dummyjson.com/products?limit=5");
  //   const data: ProductsResponse = await res.json();
  //   const products: Product[] = data.products;

  const session = await auth();
  if (!session)
    return (
      <div>
        <p>Silakan login untuk melihat produk.</p>
      </div>
    );

  const products: Product[] = await db.product.findMany({
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

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50">
          <p className="text-neutral-500 mb-2">
            Belum ada barang di inventory kamu.
          </p>
          <p className="text-sm text-neutral-400">
            Gunakan form di atas untuk menambah barang pertama!
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

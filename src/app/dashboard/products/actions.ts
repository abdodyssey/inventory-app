"use server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { setTimeout } from "timers/promises";

export async function addProduct(formData: FormData) {
  //
  await setTimeout(1000);
  const name = formData.get("productName") as string;
  const price = Number(formData.get("price")) as number;

  const session = await auth();

  if (!session?.user) throw new Error("Harus login!");

  await db.product.create({
    data: {
      name: name,
      price: price,
      userId: session.user.id as string,
    },
  });

  //   refresh ketika berhasil
  revalidatePath("/dashboard/products");
}

export async function deleteProduct(id: number) {
  const session = await auth();
  await setTimeout(1000);

  const product = await db.product.findFirst({
    where: { id, userId: session?.user?.id },
  });

  if (!product)
    throw new Error("Barang tidak ditemukan atau kamu tidak punya akses");

  await db.product.delete({
    where: { id },
  });
  revalidatePath("/dashboard/products");
}

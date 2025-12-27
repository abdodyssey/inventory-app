"use server";

import { auth } from "@/auth";
import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  const name = formData.get("productName") as string;
  const price = Number(formData.get("price")) as number;

  const session = await auth();

  // ✅ PERBAIKAN 1: Pastikan user login & id ada sebelum insert
  if (!session?.user?.id) {
    throw new Error("Anda harus login untuk menambah produk");
  }

  await db.product.create({
    data: {
      name: name,
      price: price,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/products");
}

export async function deleteProduct(id: number) {
  const session = await auth();

  // ✅ PERBAIKAN 2: Proteksi Delete
  // Jangan jalankan query jika session tidak ada
  if (!session?.user?.id) {
    throw new Error("Anda tidak memiliki izin");
  }

  // ✅ PERBAIKAN 3: Pastikan user hanya bisa menghapus miliknya sendiri
  const product = await db.product.findFirst({
    where: { 
        id: id, 
        userId: session.user.id 
    },
  });

  if (!product) {
    throw new Error("Produk tidak ditemukan atau bukan milik Anda");
  }
 
  await db.product.delete({
    where: { id: id },
  });

  revalidatePath("/dashboard/products");
}
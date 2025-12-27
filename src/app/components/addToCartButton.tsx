"use client";
import { Plus } from "lucide-react";

//
interface ButtonProps {
  productName: string;
  stock?: number;
}

export default function AddToCartButton({ productName }: ButtonProps) {
  const handleAdd = () => {
    alert(`${productName} berhasil ditambahkan kekeranjang!`);
  };
  return (
    <button
      onClick={handleAdd}
      className="max-w-xs hover:bg-neutral-700 bg-neutral-800  hover:cursor-pointer flex text-sm items-center justify-center border border-neutral-800 px-4 py-2 rounded-sm "
    >
      <Plus className="mr-2" size={14} /> Add to Cart
    </button>
  );
}

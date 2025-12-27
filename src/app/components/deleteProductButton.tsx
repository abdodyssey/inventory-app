"use client";
import { Plus, Trash2 } from "lucide-react";
import { deleteProduct } from "../dashboard/products/actions";

export default function DeleteProductButton({ id }: { id: number }) {
  const handleDelete = () => {
    deleteProduct(id);
  };
  return (
    <button
      onClick={handleDelete}
      className="max-w-xs hover:bg-neutral-700 bg-red-700  hover:cursor-pointer flex text-sm items-center justify-center border border-red-700 px-4 py-2 rounded-sm "
    >
      <Trash2 size={14} />
    </button>
  );
}

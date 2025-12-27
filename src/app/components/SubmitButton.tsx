"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    
  // Hook -> otomatis tahu status form -> pending / apapun itu
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 rounded text-white ${
        pending ? "bg-neutral-400" : "bg-emerald-600 hover:bg-emerald-700"
      }`}
    >
      {pending ? "Sedang Menyimpan" : "Simpan Produk"}
    </button>
  );
}

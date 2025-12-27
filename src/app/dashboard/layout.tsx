import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-screen">
      <aside className="w-64 bg-neutral-900  p-5 border-r">
        <h2 className="font-bold mb-4">Menu Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link href={"/dashboard/"}>Overview</Link>
          </li>
          <li>
            <Link href={"/dashboard/products"}>Manage Products</Link>
          </li>
          <li>
            <Link href={"/dashboard/settings"}>Settings</Link>
          </li>
        </ul>
      </aside>
      <div className="flex-1 p-10">{children}</div>
    </section>
  );
}

import { signIn } from "@/auth";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Devtective</h1>
      <nav>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/dashboard/products"}>Products</Link>
        <Link href={"/dashboard/settinfs"}>Settings</Link>
      </nav>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button type="submit">Signin with google</button>
      </form>
    </main>
  );
}

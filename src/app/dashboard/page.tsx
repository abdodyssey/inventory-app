import { auth } from "@/auth";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <div className="flex items-center gap-4">
        <Image
          width={30}
          height={30}
          alt="Profile"
          className="rounded-full"
          src={session?.user?.image || ""}
        />
        <h1 className="text-xl font-medium">{session?.user?.name}</h1>
      </div>
    </div>
  );
}

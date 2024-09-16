import { auth } from "@/auth";
import Hero from "@/components/shared/Hero";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) redirect("/dashboard");

  return (
    <main className="flex-1">
      <Hero />
    </main>
  );
}

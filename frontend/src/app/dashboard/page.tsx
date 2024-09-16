import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return <>{session?.user.name}</>;
}

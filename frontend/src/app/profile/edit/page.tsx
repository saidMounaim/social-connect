import { auth } from "@/auth";
import EditProfileForm from "@/components/shared/Forms/EditProfileForm";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import { redirect } from "next/navigation";

export default async function EditProfile() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <ProfileSidebar user={session?.user} />
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <EditProfileForm userInfo={session?.user} />
        </div>
      </main>
    </div>
  );
}

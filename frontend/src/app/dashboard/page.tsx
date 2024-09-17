import { auth } from "@/auth";
import CreatePostForm from "@/components/shared/Forms/CreatePostForm";
import PostGrid from "@/components/shared/PostGrid";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import { getAllPostsAction } from "@/lib/actions/post.actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  const queryClient = new QueryClient();

  if (!session) redirect("/");

  queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPostsAction(),
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <ProfileSidebar user={session?.user} />
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <CreatePostForm user={session?.user} />
          <div className="flex flex-col gap-4">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <PostGrid />
            </HydrationBoundary>
          </div>
        </div>
      </main>
    </div>
  );
}

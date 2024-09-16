import Link from "next/link";
import { TabsContent } from "../ui/tabs";
import SigninForm from "./Forms/SigninForm";

export default function SigninTab() {
  return (
    <TabsContent value="signin">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-sm text-gray-500">Sign in to your account</p>
      </div>
      <SigninForm />
      <div className="mt-4 text-center">
        <Link href="#" className="text-sm text-blue-500 hover:underline">
          Forgot password?
        </Link>
      </div>
    </TabsContent>
  );
}

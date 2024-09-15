import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";

export default function SigninTab() {
  return (
    <TabsContent value="signin">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-sm text-gray-500">Sign in to your account</p>
      </div>
      <form className="space-y-4 mt-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link href="#" className="text-sm text-blue-500 hover:underline">
          Forgot password?
        </Link>
      </div>
    </TabsContent>
  );
}

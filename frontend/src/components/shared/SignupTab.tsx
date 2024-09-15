import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";

export default function SignupTab() {
  return (
    <TabsContent value="signup">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Join Social connect</h2>
        <p className="text-sm text-gray-500">
          Sign up and start connecting today!
        </p>
      </div>
      <form className="space-y-4 mt-4">
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full" type="submit">
          Create Account
        </Button>
      </form>
    </TabsContent>
  );
}

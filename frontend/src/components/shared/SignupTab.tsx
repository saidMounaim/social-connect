import { TabsContent } from "../ui/tabs";
import SignupForm from "./Forms/SignupForm";

export default function SignupTab() {
  return (
    <TabsContent value="signup">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Join Social connect</h2>
        <p className="text-sm text-gray-500">
          Sign up and start connecting today!
        </p>
      </div>
      <SignupForm />
    </TabsContent>
  );
}

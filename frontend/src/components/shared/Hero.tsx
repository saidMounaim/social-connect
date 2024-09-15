"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupTab from "./SignupTab";
import SigninTab from "./SigninTab";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <section className="w-full h-[100vh] py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 text-white">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect with friends and the world around you
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">
                Share your moments, discover new connections, and stay in touch
                with the people who matter most.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm space-y-2 bg-white p-4 rounded-lg shadow-lg">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>
                <SignupTab />
                <SigninTab />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

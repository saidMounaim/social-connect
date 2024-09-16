"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { EditProfileSchema } from "@/lib/validations";
import { ProfileEditFormProps } from "@/lib/types";
import { showToast, toastStyles } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { editProfileAction } from "@/lib/actions/user.actions";
import { useSession } from "next-auth/react";

export default function EditProfileForm({ userInfo }: ProfileEditFormProps) {
  const [imagePreview, setImagePreview] = useState<any>(userInfo?.image);
  const { toast } = useToast();
  const { update } = useSession();

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: userInfo.name,
      image: userInfo.image,
    },
  });
  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const response = await editProfileAction(formData);
      await update({ name: response.name, image: response.image });
      window.location.reload();
    } catch (error: any) {
      const errorMessage =
        error?.errorMessage || "Something went wrong, please try again.";
      showToast(toast, errorMessage, toastStyles.error);
    }
  }

  return (
    <div className="flex flex-col gap-5 mt-5">
      <h1 className="font-medium text-2xl">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormDescription>
                  Choose a profile picture. It must be less than 5MB.
                </FormDescription>
                <FormMessage />
                {imagePreview && (
                  <div className="mt-4">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}

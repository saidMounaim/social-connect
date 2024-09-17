"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageIcon, X } from "lucide-react";
import { CurrentUserProps } from "@/lib/types";
import { formatErrorMessage, getInitials, showToast } from "@/lib/utils";
import { CreatePostSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { createPostAction } from "@/lib/actions/post.actions";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePostForm({ user }: CurrentUserProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      body: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      const response = await createPostAction(formData);
      if (response.errorMessage) {
        showToast(toast, formatErrorMessage(response.errorMessage), "danger");
      } else {
        showToast(toast, "Post was added succefully", "success");
        form.reset();
        setPreviewImage(null);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    } catch (error: any) {
      const errorMessage =
        error?.errorMessage || "Something went wrong, please try again.";
      showToast(toast, errorMessage, "danger");
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    form.setValue("image", undefined);
    setPreviewImage(null);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <Avatar>
                {user.image ? (
                  <AvatarImage src={user.image} alt="Profile picture" />
                ) : (
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                )}
              </Avatar>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="What's on your mind?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {previewImage && (
              <div className="mt-4 relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-h-60 rounded-md"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Photo
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Post
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

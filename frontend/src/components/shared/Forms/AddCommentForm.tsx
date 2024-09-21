"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addCommentAction } from "@/lib/actions/comment.actions";
import { AddCommentFormProps } from "@/lib/types";
import { formatErrorMessage, getInitials, showToast } from "@/lib/utils";
import { AddCommentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function AddCommentForm({ user, postId }: AddCommentFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof AddCommentSchema>>({
    resolver: zodResolver(AddCommentSchema),
    defaultValues: {
      body: "",
    },
  });
  async function onSubmit(values: z.infer<typeof AddCommentSchema>) {
    const { body } = values;
    try {
      const response = await addCommentAction({ body, postId });
      if (response.errorMessage) {
        showToast(toast, formatErrorMessage(response.errorMessage), "danger");
      } else {
        showToast(toast, "Comment was added succefully", "success");
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      }
    } catch (error: any) {
      const errorMessage =
        error?.errorMessage || "Something went wrong, please try again.";
      showToast(toast, errorMessage, "danger");
    }
  }

  return (
    <Card className="w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-4 flex flex-col items-end">
            <div className="flex space-x-4 w-full">
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
                      <Input placeholder="Write a comment..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size="icon" className="text-right">
              <Send className="h-4 w-4" />
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

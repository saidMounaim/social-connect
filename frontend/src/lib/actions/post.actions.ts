"use server";

import { auth } from "@/auth";

const apiUrl = process.env.API_URL;

export async function createPostAction(createPostData: FormData) {
  console.log(createPostData);
  const session = await auth();

  try {
    const response = await fetch(`${apiUrl}/post/create`, {
      method: "POST",
      body: createPostData,
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return {
        errorMessage:
          error?.errorMessage || error?.message || "Unable to create new post",
      };
    } else {
      return response.json();
    }
  } catch (error: any) {
    return {
      errorMessage: error?.message || "Something went wrong, please try again",
    };
  }
}

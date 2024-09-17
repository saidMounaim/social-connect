"use server";

import { auth } from "@/auth";

const apiUrl = process.env.API_URL;

export async function addCommentAction(commentData: any) {
  const session = await auth();
  try {
    const response = await fetch(`${apiUrl}/comment`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return {
        errorMessage:
          error?.errorMessage || error?.message || "Unable to add comment",
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

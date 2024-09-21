"use server";

import { auth } from "@/auth";
import { FollowProps, registerUserProps } from "../types";
import { revalidatePath } from "next/cache";

const apiUrl = process.env.API_URL;

export async function registerUserAction(registerData: registerUserProps) {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        errorMessage:
          error?.errorMessage || error?.message || "Unable to register user",
      };
    }

    return await response.json();
  } catch (error: any) {
    return {
      errorMessage: error?.message || "Something went wrong, please try again",
    };
  }
}

export async function editProfileAction(editProfile: FormData) {
  const session = await auth();
  try {
    const response = await fetch(`${apiUrl}/auth/edit`, {
      method: "POST",
      body: editProfile,
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        errorMessage:
          error?.errorMessage ||
          error?.message ||
          "Unable to edit profile user",
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

export async function getUserByIdAction(userId: string) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`);

    if (!response.ok) {
      const error = await response.json();
      return {
        errorMessage:
          error?.errorMessage || error?.message || "Unable to get user",
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

export async function getPostsByUserIdAction(userId: string) {
  try {
    const response = await fetch(`${apiUrl}/user/posts/${userId}`);

    if (!response.ok) {
      const error = await response.json();
      return {
        errorMessage:
          error?.errorMessage || error?.message || "Unable to get user",
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

export async function followUserAction(
  userFollow: FollowProps,
  pathname: string
) {
  const session = await auth();
  try {
    const response = await fetch(`${apiUrl}/user/follow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFollow),
    });
    if (!response.ok) {
      const error = await response.json();
      return {
        errorMessage:
          error?.errorMessage || error?.message || "Unable to follow this user",
      };
    }

    revalidatePath(pathname);
    return await response.json();
  } catch (error: any) {
    return {
      errorMessage: error?.message || "Something went wrong, please try again",
    };
  }
}

export async function unFollowUserAction(
  userUnfollow: FollowProps,
  pathname: string
) {
  const session = await auth();
  try {
    const response = await fetch(`${apiUrl}/user/unfollow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUnfollow),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        errorMessage:
          error?.errorMessage ||
          error?.message ||
          "Unable to unfollow this user",
      };
    }

    revalidatePath(pathname);
    return await response.json();
  } catch (error: any) {
    return {
      errorMessage: error?.message || "Something went wrong, please try again",
    };
  }
}

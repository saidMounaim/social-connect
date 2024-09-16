"use server";

import { auth } from "@/auth";
import { registerUserProps } from "../types";

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

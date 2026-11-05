"use server";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export const signInWithPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const getOAuthSignInUrlAction = actionClient.action(async () => {
  const supabase = await createClient();

  const redirectUrl = `${env.NEXT_PUBLIC_APP_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        hd: env.NEXT_PUBLIC_COLLEGE_DOMAIN,
        prompt: "select_account",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { url: data.url };
});

export const signInWithPasswordAction = actionClient
  .schema(signInWithPasswordSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsedInput.email,
      password: parsedInput.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { userId: data.user.id };
  });

export const signOutAction = actionClient.action(async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
});

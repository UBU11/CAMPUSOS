"use server";

import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/lib/supabase/server";

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

export const signOutAction = actionClient.action(async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
});

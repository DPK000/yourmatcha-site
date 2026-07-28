import { supabase } from "@/lib/supabase";

/**
 * Schrijft een nieuwsbrief-inschrijving naar Supabase.
 * Een al bestaand e-mailadres (unique constraint) telt als succes.
 */
export async function subscribeToNewsletter(email: string, source: string): Promise<boolean> {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.trim().toLowerCase(), source });
  if (!error) return true;
  if (error.code === "23505") return true; // duplicate: al ingeschreven
  console.error("[newsletter] insert failed", error.message);
  return false;
}

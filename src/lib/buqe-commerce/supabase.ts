import { createClient } from "@supabase/supabase-js";
import { buqeConfig } from "../../../buqe.config";

export const supabase = createClient(
  buqeConfig.supabase.url,
  buqeConfig.supabase.anonKey
);

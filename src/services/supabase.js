import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nefbeqqarivxgubavzqx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lZmJlcXFhcml2eGd1YmF2enF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MTY2MzUsImV4cCI6MjA1MDI5MjYzNX0.Hp4_PcIN_n_6As7KS2ROAiVzwlvfHBtTrO2Mc-z9N6Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

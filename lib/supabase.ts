import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.https://wzkcivqayjybpxlkulap.supabase.com!
const supabaseAnonKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6a2NpdnFheWp5YnB4bGt1bGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTIyMzIsImV4cCI6MjA2ODI4ODIzMn0.ycnuQNfwjM3vdLF9gZNE_e5qc8HAHUSTh5f5l515wF8!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

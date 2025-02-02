import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ybeimrcenjgdoxtcldpd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZWltcmNlbmpnZG94dGNsZHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MDgxNjIsImV4cCI6MjA0OTM4NDE2Mn0.gIVeFxdyrTiYaWxNFaXllVJvBC0AR0VAYbQYRePZ7Vo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
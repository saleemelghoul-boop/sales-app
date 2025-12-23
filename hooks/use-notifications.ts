"use client"

import { useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase"

export function useNotifications(userId: string) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!userId) return

    const loadUnreadCount = async () => {
      try {
        const supabase = getSupabase()
        const { data, error } = await supabase
          .from("notifications")
          .select("id", { count: "exact" })
          .eq("user_id", userId)
          .eq("is_read", false)

        if (!error && data) {
          setUnreadCount(data.length)
        }
      } catch (error) {
        console.error("Error loading notifications:", error)
      }
    }

    loadUnreadCount()
    const interval = setInterval(loadUnreadCount, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [userId])

  return { unreadCount }
}

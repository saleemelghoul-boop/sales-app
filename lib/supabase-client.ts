// يمكن تفعيله لاحقاً عند الحاجة

// Helper function to generate IDs
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Supabase معطل حالياً - التطبيق يستخدم localStorage
export const supabase = null

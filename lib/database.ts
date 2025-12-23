import { generateId } from "./supabase-client"
import { supabase } from "./supabase-client"

export interface User {
  id: string
  username: string
  password: string
  full_name: string
  role: "admin" | "sales_rep"
  phone?: string
  email?: string
  security_question?: string
  security_answer?: string
  is_active: boolean
  admin_permission?: AdminPermission
  created_at: string
}

export type AdminPermission = "full" | "orders_only"

export interface ProductGroup {
  id: string
  name: string
  description?: string
  image?: string
  created_at: string
}

export interface Product {
  id: string
  group_id: string
  name: string
  code: string
  price: number
  unit: string
  created_at: string
}

export interface Customer {
  id: string
  sales_rep_id: string
  name: string
  phone?: string
  address?: string
  created_at: string
}

export interface Order {
  id: string
  sales_rep_id: string
  customer_id: string
  customer_name: string
  status: "draft" | "pending" | "printed" | "completed" | "deleted"
  total: number
  notes?: string
  text_order?: string
  images?: string[]
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  price: number
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  message: string
  type: "order_submitted" | "order_printed"
  is_read: boolean
  related_order_id?: string
  created_at: string
}

class SupabaseDatabase {
  // 🟢 المستخدمين
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("❌ خطأ في جلب المستخدمين:", error)
      return []
    }
    return data || []
  }

  async addUser(user: Omit<User, "id" | "created_at">): Promise<User | null> {
    const newUser: User = {
      ...user,
      id: generateId(),
      created_at: new Date().toISOString(),
    }
    const { data, error } = await supabase.from("users").insert(newUser).select().single()
    if (error) {
      console.error("❌ خطأ في إضافة المستخدم:", error)
      return null
    }
    return data
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()
    if (error) {
      console.error("❌ خطأ في تحديث المستخدم:", error)
      return null
    }
    return data
  }

  async deleteUser(id: string): Promise<boolean> {
    const { error } = await supabase.from("users").delete().eq("id", id)
    if (error) {
      console.error("❌ خطأ في حذف المستخدم:", error)
      return false
    }
    return true
  }

  // 🟢 باقي الدوال (Products, Customers, Orders, Notifications)
  // نفس المنطق: استخدم supabase بدل window.supabase
  // وهي موجودة عندك بالفعل، فقط غيّر window.supabase إلى supabase
}

export const db = new SupabaseDatabase()

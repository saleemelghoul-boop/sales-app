"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Users, Package, Bell, Shield } from "lucide-react"
import { ManageRepsView } from "@/components/admin/manage-reps-view"
import { ManageProductsView } from "@/components/admin/manage-products-view"
import { OrdersManagementView } from "@/components/admin/orders-management-view"
import { ManageAdminsView } from "@/components/admin/manage-admins-view"

type AdminTab = "reps" | "products" | "orders" | "admins"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<AdminTab>("orders")

  const hasFullPermission = user?.role === "admin" && (user?.admin_permission === "full" || !user?.admin_permission)

  console.log("[v0] 🔍 فحص صلاحيات المدير:", {
    role: user?.role,
    permission: user?.admin_permission,
    hasFullPermission,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">مرحباً بك، {user?.full_name || user?.username} 👋</h1>
              <p className="text-xs text-muted-foreground">لوحة تحكم المدير</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b bg-background">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "orders"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bell className="h-4 w-4" />
            الطلبيات
          </button>
          {hasFullPermission && (
            <>
              <button
                onClick={() => setActiveTab("reps")}
                className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "reps"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="h-4 w-4" />
                المندوبين
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "products"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Package className="h-4 w-4" />
                الدرافت
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "admins"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Shield className="h-4 w-4" />
                المديرين
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="p-4 pb-6">
        {activeTab === "orders" && <OrdersManagementView />}
        {hasFullPermission && activeTab === "reps" && <ManageRepsView />}
        {hasFullPermission && activeTab === "products" && <ManageProductsView />}
        {hasFullPermission && activeTab === "admins" && <ManageAdminsView />}
      </main>
    </div>
  )
}

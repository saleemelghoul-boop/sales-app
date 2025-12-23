"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Users, ShoppingCart, Package, Bell } from "lucide-react"
import { ManageCustomersView } from "@/components/sales-rep/manage-customers-view"
import { CreateOrderView } from "@/components/sales-rep/create-order-view"
import { MyOrdersView } from "@/components/sales-rep/my-orders-view"
import { NotificationsView } from "@/components/sales-rep/notifications-view"
import { useNotifications } from "@/hooks/use-notifications"

type SalesRepTab = "orders" | "create-order" | "customers" | "notifications"

export function SalesRepDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<SalesRepTab>("create-order")
  const { unreadCount } = useNotifications(user?.id || "")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">أهلاً {user?.full_name || user?.username} 🌟</h1>
              <p className="text-xs text-muted-foreground">لوحة المندوب</p>
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
            onClick={() => setActiveTab("create-order")}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
              activeTab === "create-order"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            طلبية جديدة
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
              activeTab === "orders"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            طلبياتي
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
              activeTab === "customers"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            العملاء
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`relative flex flex-1 items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
              activeTab === "notifications"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bell className="h-4 w-4" />
            الإشعارات
            {unreadCount > 0 && (
              <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="p-4 pb-6">
        {activeTab === "create-order" && <CreateOrderView />}
        {activeTab === "orders" && <MyOrdersView />}
        {activeTab === "customers" && <ManageCustomersView />}
        {activeTab === "notifications" && <NotificationsView />}
      </main>
    </div>
  )
}

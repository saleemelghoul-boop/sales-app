export type User = {
  id: string
  username: string
  password: string
  role: "admin" | "sales_rep"
  full_name: string | null
  phone: string | null
  is_active: boolean
}

export type ProductGroup = {
  id: string
  name: string
  description: string | null
  display_order: number
  is_active: boolean
}

export type Product = {
  id: string
  group_id: string
  name: string
  code: string | null
  description: string | null
  price: number | null
  unit: string | null
  display_order: number
  is_active: boolean
}

export type Customer = {
  id: string
  sales_rep_id: string
  name: string
  phone: string | null
  address: string | null
  area: string | null
  notes: string | null
  is_active: boolean
  created_at: string
}

export type Order = {
  id: string
  order_number: string
  sales_rep_id: string
  customer_id: string
  customer_name: string
  status: "pending" | "printed" | "cancelled"
  total_amount: number
  notes: string | null
  created_at: string
  printed_at: string | null
  printed_by: string | null
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number | null
  total_price: number | null
  notes: string | null
}

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: "order_submitted" | "order_printed" | "info"
  order_id: string | null
  is_read: boolean
  created_at: string
}

// Mock Database for preview environment
class MockDatabase {
  private users: User[] = [
    {
      id: "1",
      username: "admin",
      password: "admin",
      role: "admin",
      full_name: "مدير النظام",
      phone: null,
      is_active: true,
    },
  ]

  private productGroups: ProductGroup[] = [
    {
      id: "group-1",
      name: "أدوية الجهاز التنفسي",
      description: "أدوية لعلاج أمراض الجهاز التنفسي",
      display_order: 1,
      is_active: true,
    },
    {
      id: "group-2",
      name: "مضادات حيوية",
      description: "مضادات حيوية متنوعة",
      display_order: 2,
      is_active: true,
    },
    {
      id: "group-3",
      name: "مسكنات الألم",
      description: "مسكنات ومضادات التهاب",
      display_order: 3,
      is_active: true,
    },
    {
      id: "group-4",
      name: "أدوية الجهاز الهضمي",
      description: "أدوية لعلاج مشاكل الجهاز الهضمي",
      display_order: 4,
      is_active: true,
    },
  ]

  private products: Product[] = [
    // Respiratory medications
    {
      id: "prod-1",
      group_id: "group-1",
      name: "فنتولين شراب 100 مل",
      code: "VNT001",
      description: "موسع قصبي",
      price: 15.5,
      unit: "زجاجة",
      display_order: 1,
      is_active: true,
    },
    {
      id: "prod-2",
      group_id: "group-1",
      name: "سيتيريزين 10 مغ",
      code: "CTR010",
      description: "مضاد حساسية",
      price: 8.0,
      unit: "علبة",
      display_order: 2,
      is_active: true,
    },
    {
      id: "prod-3",
      group_id: "group-1",
      name: "كلاريتين 10 مغ",
      code: "CLR010",
      description: "مضاد حساسية",
      price: 12.0,
      unit: "علبة",
      display_order: 3,
      is_active: true,
    },
    // Antibiotics
    {
      id: "prod-4",
      group_id: "group-2",
      name: "أموكسيسيلين 500",
      code: "AMX500",
      description: "مضاد حيوي واسع المجال",
      price: 25.0,
      unit: "علبة",
      display_order: 1,
      is_active: true,
    },
    {
      id: "prod-5",
      group_id: "group-2",
      name: "أزيثرومايسين 250",
      code: "AZM250",
      description: "مضاد حيوي",
      price: 30.0,
      unit: "علبة",
      display_order: 2,
      is_active: true,
    },
    {
      id: "prod-6",
      group_id: "group-2",
      name: "سيفالكسين 500",
      code: "CFX500",
      description: "مضاد حيوي",
      price: 28.0,
      unit: "علبة",
      display_order: 3,
      is_active: true,
    },
    // Pain relievers
    {
      id: "prod-7",
      group_id: "group-3",
      name: "باراسيتامول 500",
      code: "PCM500",
      description: "مسكن وخافض للحرارة",
      price: 5.0,
      unit: "علبة",
      display_order: 1,
      is_active: true,
    },
    {
      id: "prod-8",
      group_id: "group-3",
      name: "ايبوبروفين 400",
      code: "IBU400",
      description: "مضاد للالتهاب ومسكن",
      price: 12.0,
      unit: "علبة",
      display_order: 2,
      is_active: true,
    },
    {
      id: "prod-9",
      group_id: "group-3",
      name: "أسبرين 100",
      code: "ASP100",
      description: "مسكن ومميع للدم",
      price: 6.5,
      unit: "علبة",
      display_order: 3,
      is_active: true,
    },
    // Digestive medications
    {
      id: "prod-10",
      group_id: "group-4",
      name: "أوميبرازول 20 مغ",
      code: "OMP020",
      description: "لعلاج الحموضة",
      price: 18.0,
      unit: "علبة",
      display_order: 1,
      is_active: true,
    },
    {
      id: "prod-11",
      group_id: "group-4",
      name: "موتيليوم 10 مغ",
      code: "MTL010",
      description: "مضاد للغثيان",
      price: 14.0,
      unit: "علبة",
      display_order: 2,
      is_active: true,
    },
  ]

  private customers: Customer[] = []

  private orders: Order[] = []
  private orderItems: OrderItem[] = []
  private notifications: Notification[] = []

  private generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  // Users
  async getUsers(filter?: Partial<User>) {
    console.log("[v0] 🔍 Getting users with filter:", filter)
    let result = this.users
    if (filter) {
      result = result.filter((user) => {
        return Object.entries(filter).every(([key, value]) => user[key as keyof User] === value)
      })
    }
    console.log("[v0] ✅ Users query returned:", result.length, "users")
    return result
  }

  async createUser(user: Omit<User, "id">) {
    const newUser: User = { ...user, id: this.generateId() }
    this.users.push(newUser)
    console.log("[v0] ✅ Created new user:", newUser.id, newUser.username, "Role:", newUser.role)

    if (newUser.role === "sales_rep") {
      const demoCustomers: Omit<Customer, "id" | "created_at">[] = [
        {
          sales_rep_id: newUser.id,
          name: "صيدلية الشفاء",
          phone: "07701234567",
          address: "شارع الرشيد - مقابل البنك المركزي",
          area: "الكرادة",
          notes: "عميل تجريبي - يمكنك حذفه أو تعديله",
          is_active: true,
        },
        {
          sales_rep_id: newUser.id,
          name: "صيدلية النور",
          phone: "07801234567",
          address: "شارع فلسطين",
          area: "المنصور",
          notes: "عميل تجريبي - يمكنك حذفه أو تعديله",
          is_active: true,
        },
      ]

      for (const customer of demoCustomers) {
        await this.createCustomer(customer)
      }

      console.log("[v0] ✅ Auto-created 2 demo customers for sales rep:", newUser.id)
    }

    return newUser
  }

  async updateUser(id: string, updates: Partial<User>) {
    const index = this.users.findIndex((u) => u.id === id)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates }
      console.log("[v0] ✅ Updated user:", id)
      return this.users[index]
    }
    console.error("[v0] ❌ User not found:", id)
    return null
  }

  async deleteUser(id: string) {
    const index = this.users.findIndex((u) => u.id === id)
    if (index !== -1) {
      this.users.splice(index, 1)
      console.log("[v0] ✅ Deleted user:", id)
      return true
    }
    console.error("[v0] ❌ User not found:", id)
    return false
  }

  // Product Groups
  async getProductGroups(filter?: Partial<ProductGroup>) {
    console.log("[v0] 🔍 Getting product groups with filter:", filter)
    let result = this.productGroups
    if (filter) {
      result = result.filter((group) => {
        return Object.entries(filter).every(([key, value]) => group[key as keyof ProductGroup] === value)
      })
    }
    const sorted = result.sort((a, b) => a.display_order - b.display_order)
    console.log("[v0] ✅ Product groups query returned:", sorted.length, "groups")
    return sorted
  }

  async createProductGroup(group: Omit<ProductGroup, "id">) {
    const newGroup: ProductGroup = {
      ...group,
      id: this.generateId(),
      display_order: this.productGroups.length + 1,
      is_active: true,
    }
    this.productGroups.push(newGroup)
    console.log("[v0] ✅ Created product group:", newGroup.id, newGroup.name)
    return newGroup
  }

  async updateProductGroup(id: string, updates: Partial<ProductGroup>) {
    const index = this.productGroups.findIndex((g) => g.id === id)
    if (index !== -1) {
      this.productGroups[index] = { ...this.productGroups[index], ...updates }
      console.log("[v0] ✅ Updated product group:", id)
      return this.productGroups[index]
    }
    console.error("[v0] ❌ Product group not found:", id)
    return null
  }

  async deleteProductGroup(id: string) {
    const index = this.productGroups.findIndex((g) => g.id === id)
    if (index !== -1) {
      this.productGroups.splice(index, 1)
      // Delete associated products
      this.products = this.products.filter((p) => p.group_id !== id)
      console.log("[v0] ✅ Deleted product group:", id)
      return true
    }
    console.error("[v0] ❌ Product group not found:", id)
    return false
  }

  // Products
  async getProducts(filter?: Partial<Product>) {
    console.log("[v0] 🔍 Getting products with filter:", filter)
    let result = this.products
    if (filter) {
      result = result.filter((product) => {
        return Object.entries(filter).every(([key, value]) => product[key as keyof Product] === value)
      })
    }
    const sorted = result.sort((a, b) => a.display_order - b.display_order)
    console.log("[v0] ✅ Products query returned:", sorted.length, "products")
    return sorted
  }

  async createProduct(product: Omit<Product, "id">) {
    const newProduct: Product = {
      ...product,
      id: this.generateId(),
      display_order: this.products.length + 1,
      is_active: true,
    }
    this.products.push(newProduct)
    console.log("[v0] ✅ Created product:", newProduct.id, newProduct.name, "in group:", newProduct.group_id)
    return newProduct
  }

  async updateProduct(id: string, updates: Partial<Product>) {
    const index = this.products.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates }
      console.log("[v0] ✅ Updated product:", id)
      return this.products[index]
    }
    console.error("[v0] ❌ Product not found:", id)
    return null
  }

  async deleteProduct(id: string) {
    const index = this.products.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.products.splice(index, 1)
      console.log("[v0] ✅ Deleted product:", id)
      return true
    }
    console.error("[v0] ❌ Product not found:", id)
    return false
  }

  // Customers
  async getCustomers(filter?: Partial<Customer>) {
    console.log("[v0] 🔍 Getting customers with filter:", filter)
    let result = this.customers
    if (filter) {
      result = result.filter((customer) => {
        return Object.entries(filter).every(([key, value]) => customer[key as keyof Customer] === value)
      })
    }
    const sorted = result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    console.log("[v0] ✅ Customers query returned:", sorted.length, "customers")
    return sorted
  }

  async createCustomer(customer: Omit<Customer, "id" | "created_at">) {
    const newCustomer: Customer = {
      ...customer,
      id: this.generateId(),
      created_at: new Date().toISOString(),
    }
    this.customers.push(newCustomer)
    console.log("[v0] ✅ Created customer:", newCustomer.id, newCustomer.name, "for rep:", newCustomer.sales_rep_id)
    return newCustomer
  }

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const index = this.customers.findIndex((c) => c.id === id)
    if (index !== -1) {
      this.customers[index] = { ...this.customers[index], ...updates }
      console.log("[v0] ✅ Updated customer:", id)
      return this.customers[index]
    }
    console.error("[v0] ❌ Customer not found:", id)
    return null
  }

  async deleteCustomer(id: string) {
    const index = this.customers.findIndex((c) => c.id === id)
    if (index !== -1) {
      this.customers.splice(index, 1)
      console.log("[v0] ✅ Deleted customer:", id)
      return true
    }
    console.error("[v0] ❌ Customer not found:", id)
    return false
  }

  // Orders
  async getOrders(filter?: Partial<Order>) {
    console.log("[v0] 🔍 Getting orders with filter:", filter)
    let result = this.orders
    if (filter) {
      result = result.filter((order) => {
        return Object.entries(filter).every(([key, value]) => order[key as keyof Order] === value)
      })
    }
    const sorted = result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    console.log("[v0] ✅ Orders query returned:", sorted.length, "orders")
    return sorted
  }

  async createOrder(order: Omit<Order, "id" | "order_number" | "created_at">) {
    const orderNumber = `ORD-${Date.now()}`
    const newOrder: Order = {
      ...order,
      id: this.generateId(),
      order_number: orderNumber,
      created_at: new Date().toISOString(),
    }
    this.orders.push(newOrder)
    console.log("[v0] ✅ Created order:", newOrder.id, newOrder.order_number)
    return newOrder
  }

  async updateOrder(id: string, updates: Partial<Order>) {
    const index = this.orders.findIndex((o) => o.id === id)
    if (index !== -1) {
      this.orders[index] = { ...this.orders[index], ...updates }
      console.log("[v0] ✅ Updated order:", id)
      return this.orders[index]
    }
    console.error("[v0] ❌ Order not found:", id)
    return null
  }

  // Order Items
  async getOrderItems(orderId: string) {
    const items = this.orderItems.filter((item) => item.order_id === orderId)
    console.log("[v0] 🔍 Getting order items for order:", orderId, "Found:", items.length)
    return items
  }

  async createOrderItem(item: Omit<OrderItem, "id">) {
    const newItem: OrderItem = { ...item, id: this.generateId() }
    this.orderItems.push(newItem)
    console.log("[v0] ✅ Created order item:", newItem.id, "for order:", newItem.order_id)
    return newItem
  }

  // Notifications
  async getNotifications(userId: string) {
    const notifications = this.notifications
      .filter((n) => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    console.log("[v0] 🔍 Getting notifications for user:", userId, "Found:", notifications.length)
    return notifications
  }

  async createNotification(notification: Omit<Notification, "id" | "created_at">) {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      created_at: new Date().toISOString(),
    }
    this.notifications.push(newNotification)
    console.log("[v0] ✅ Created notification:", newNotification.id, "for user:", newNotification.user_id)
    return newNotification
  }

  async markNotificationAsRead(id: string) {
    const index = this.notifications.findIndex((n) => n.id === id)
    if (index !== -1) {
      this.notifications[index].is_read = true
      console.log("[v0] ✅ Marked notification as read:", id)
      return this.notifications[index]
    }
    console.error("[v0] ❌ Notification not found:", id)
    return null
  }
}

const db = new MockDatabase()

// Supabase-compatible wrapper with proper from/insert/update/select API
export function getSupabase() {
  return {
    from: (table: string) => {
      return {
        select: (columns = "*") => {
          console.log("[v0] 📡 SELECT query on table:", table)

          const createSelectPromise = async (filterFn?: (item: any) => boolean) => {
            let data: any[] = []

            if (table === "users") {
              data = await db.getUsers()
            } else if (table === "product_groups") {
              data = await db.getProductGroups()
            } else if (table === "products") {
              data = await db.getProducts()
            } else if (table === "customers") {
              data = await db.getCustomers()
            } else if (table === "orders") {
              data = await db.getOrders()
            } else if (table === "notifications") {
              data = await db.getNotifications("")
            }

            if (filterFn) {
              const beforeFilter = data.length
              data = data.filter(filterFn)
              console.log("[v0] 🔽 Filtered from", beforeFilter, "to", data.length, "results")
            }

            console.log("[v0] ✅ SELECT returned:", data.length, "rows from", table)
            return { data, error: null }
          }

          const selectMethods = {
            eq: (column: string, value: any) => {
              console.log("[v0] 🔍 Adding .eq filter:", column, "=", value)
              const filterFn = (item: any) => item[column] === value

              const eqPromise = createSelectPromise(filterFn)

              return Object.assign(eqPromise, {
                order: (orderColumn: string, options?: { ascending: boolean }) => {
                  console.log("[v0] 📊 Adding .order:", orderColumn, options)
                  return createSelectPromise(filterFn).then((result) => {
                    if (options && !options.ascending) {
                      result.data = result.data.reverse()
                    }
                    return result
                  })
                },
                single: () => {
                  console.log("[v0] 🎯 Adding .single to get first result")
                  return createSelectPromise(filterFn).then((result) => {
                    return { data: result.data[0] || null, error: result.error }
                  })
                },
              })
            },
            order: (orderColumn: string, options?: { ascending: boolean }) => {
              console.log("[v0] 📊 Adding .order:", orderColumn, options)
              return createSelectPromise().then((result) => {
                if (options && !options.ascending) {
                  result.data = result.data.reverse()
                }
                return result
              })
            },
            single: () => {
              console.log("[v0] 🎯 Adding .single to get first result")
              return createSelectPromise().then((result) => {
                return { data: result.data[0] || null, error: result.error }
              })
            },
          }

          return Object.assign(createSelectPromise(), selectMethods)
        },
        insert: (records: any[]) => {
          console.log("[v0] ➕ INSERT query on table:", table, "Records:", records.length)

          const insertPromise = new Promise<{ data: any | null; error: null }>(async (resolve) => {
            let result = null
            try {
              if (table === "users") {
                result = await db.createUser(records[0])
              } else if (table === "product_groups") {
                result = await db.createProductGroup(records[0])
              } else if (table === "products") {
                result = await db.createProduct(records[0])
              } else if (table === "customers") {
                result = await db.createCustomer(records[0])
              } else if (table === "orders") {
                result = await db.createOrder(records[0])
              } else if (table === "order_items") {
                result = await db.createOrderItem(records[0])
              } else if (table === "notifications") {
                result = await db.createNotification(records[0])
              }
              console.log("[v0] ✅ INSERT successful on", table, "ID:", result?.id)
            } catch (error) {
              console.error("[v0] ❌ INSERT error on", table, ":", error)
            }
            resolve({ data: result, error: null })
          })

          return Object.assign(insertPromise, {
            select: () => {
              return Object.assign(insertPromise, {
                single: () => insertPromise,
              })
            },
          })
        },
        update: (updates: any) => {
          console.log("[v0] 🔄 UPDATE query on table:", table, "Updates:", updates)

          return {
            eq: (column: string, value: any) => {
              console.log("[v0] 🔍 UPDATE where", column, "=", value)

              return new Promise<{ data: any | null; error: null }>(async (resolve) => {
                let result = null
                try {
                  if (table === "users") {
                    result = await db.updateUser(value, updates)
                  } else if (table === "product_groups") {
                    result = await db.updateProductGroup(value, updates)
                  } else if (table === "products") {
                    result = await db.updateProduct(value, updates)
                  } else if (table === "customers") {
                    result = await db.updateCustomer(value, updates)
                  } else if (table === "orders") {
                    result = await db.updateOrder(value, updates)
                  } else if (table === "notifications") {
                    result = await db.markNotificationAsRead(value)
                  }
                  console.log("[v0] ✅ UPDATE successful on", table)
                } catch (error) {
                  console.error("[v0] ❌ UPDATE error on", table, ":", error)
                }
                resolve({ data: result, error: null })
              })
            },
          }
        },
        delete: () => {
          console.log("[v0] ❌ DELETE query on table:", table)

          return {
            eq: (column: string, value: any) => {
              console.log("[v0] 🔍 DELETE where", column, "=", value)

              return new Promise<{ error: null }>(async (resolve) => {
                try {
                  if (table === "product_groups") {
                    await db.deleteProductGroup(value)
                  } else if (table === "products") {
                    await db.deleteProduct(value)
                  }
                  console.log("[v0] ✅ DELETE successful on", table)
                } catch (error) {
                  console.error("[v0] ❌ DELETE error on", table, ":", error)
                }
                resolve({ error: null })
              })
            },
          }
        },
      }
    },
  }
}

export function getDatabase() {
  return db
}

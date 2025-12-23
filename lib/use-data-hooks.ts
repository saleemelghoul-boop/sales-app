"use client"

import { useEffect, useState } from "react"
import {
  db,
  type User,
  type ProductGroup,
  type Product,
  type Customer,
  type Order,
  type Notification,
} from "./database"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    const data = await db.getUsers()
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { users, loading, refresh }
}

export function useProductGroups() {
  const [groups, setGroups] = useState<ProductGroup[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    const data = await db.getProductGroups()
    setGroups(data)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { groups, loading, refresh }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    const data = await db.getProducts()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { products, loading, refresh }
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    const data = await db.getCustomers()
    setCustomers(data)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { customers, loading, refresh }
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    const data = await db.getOrders()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, 5000)
    return () => clearInterval(interval)
  }, [])

  return { orders, loading, refresh }
}

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    const data = await db.getNotifications()
    setNotifications(data.filter((n) => n.user_id === userId))
    setLoading(false)
  }

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, 3000)
    return () => clearInterval(interval)
  }, [userId])

  return { notifications, loading, refresh }
}

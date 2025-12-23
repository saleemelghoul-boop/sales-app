"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, UserPlus, KeyRound } from "lucide-react"
import { getSupabase } from "@/lib/supabase"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export function LoginScreen() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { login } = useAuth()

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotUsername, setForgotUsername] = useState("")
  const [forgotSecurityAnswer, setForgotSecurityAnswer] = useState("")
  const [recoveryStep, setRecoveryStep] = useState<"username" | "security" | "reset">("username")
  const [recoveryUser, setRecoveryUser] = useState<any>(null)
  const [newPasswordForRecovery, setNewPasswordForRecovery] = useState("")
  const [forgotError, setForgotError] = useState("")
  const [forgotSuccess, setForgotSuccess] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const loginSuccess = await login(username, password)

    if (!loginSuccess) {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
      setLoading(false)
    }
  }

  const createDemoRep = async () => {
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const supabase = getSupabase()

      const { data: existingRep } = await supabase.from("users").select("*").eq("username", "rep1").single()

      if (existingRep) {
        setError("المندوب التجريبي موجود مسبقاً. يمكنك تسجيل الدخول باسم: rep1 وكلمة المرور: rep1")
        setLoading(false)
        return
      }

      await supabase.from("users").insert([
        {
          username: "rep1",
          password: "rep1",
          role: "sales_rep",
          full_name: "مندوب تجريبي",
          phone: "07701234567",
          is_active: true,
        },
      ])

      setSuccess("تم إنشاء المندوب التجريبي! يمكنك تسجيل الدخول الآن باسم: rep1 وكلمة المرور: rep1")
      setUsername("rep1")
      setPassword("rep1")
    } catch (err) {
      setError("حدث خطأ أثناء إنشاء المندوب التجريبي")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setForgotError("")
    setForgotSuccess("")

    if (recoveryStep === "username") {
      if (!forgotUsername) {
        setForgotError("الرجاء إدخال اسم المستخدم")
        return
      }

      const supabase = getSupabase()
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("username", forgotUsername)
        .eq("role", "admin")
        .single()

      if (!user) {
        setForgotError("اسم المستخدم غير موجود أو ليس مديراً")
        return
      }

      if (!user.security_question || !user.security_answer) {
        setForgotError("هذا الحساب لا يحتوي على سؤال أمان. الرجاء التواصل مع المسؤول.")
        return
      }

      setRecoveryUser(user)
      setRecoveryStep("security")
    } else if (recoveryStep === "security") {
      if (!forgotSecurityAnswer) {
        setForgotError("الرجاء إدخال جواب سؤال الأمان")
        return
      }

      if (forgotSecurityAnswer.toLowerCase().trim() !== recoveryUser.security_answer.toLowerCase().trim()) {
        setForgotError("جواب سؤال الأمان غير صحيح")
        return
      }

      setRecoveryStep("reset")
    } else if (recoveryStep === "reset") {
      if (!newPasswordForRecovery || newPasswordForRecovery.length < 4) {
        setForgotError("الرجاء إدخال كلمة مرور جديدة (على الأقل 4 أحرف)")
        return
      }

      const supabase = getSupabase()
      await supabase.from("users").update({ password: newPasswordForRecovery }).eq("id", recoveryUser.id)

      setForgotSuccess("تم تغيير كلمة المرور بنجاح! يمكنك تسجيل الدخول الآن")
      setTimeout(() => {
        setShowForgotPassword(false)
        setUsername(recoveryUser.username)
        setPassword(newPasswordForRecovery)
        resetForgotPasswordForm()
      }, 2000)
    }
  }

  const resetForgotPasswordForm = () => {
    setForgotUsername("")
    setForgotSecurityAnswer("")
    setNewPasswordForRecovery("")
    setRecoveryStep("username")
    setRecoveryUser(null)
    setForgotError("")
    setForgotSuccess("")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-6">
            <h1
              className="text-3xl font-bold text-primary mb-2"
              style={{
                textShadow: "2px 2px 4px rgba(184, 134, 11, 0.5), -1px -1px 2px rgba(218, 165, 32, 0.3)",
                filter: "drop-shadow(0 0 3px oklch(0.7 0.15 60))",
              }}
            >
              شركة الترياق الجديد
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-yellow-600 to-transparent rounded-full"></div>
          </div>

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
          <CardDescription>مرحباً بك في نظام إدارة المبيعات</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-right"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">أو</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={createDemoRep}
              disabled={loading}
            >
              <UserPlus className="ml-2 h-4 w-4" />
              إنشاء مندوب تجريبي للاختبار
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true)
                  resetForgotPasswordForm()
                }}
                className="text-sm text-primary hover:underline"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={showForgotPassword}
        onOpenChange={(open) => {
          setShowForgotPassword(open)
          if (!open) resetForgotPasswordForm()
        }}
      >
        <DialogContent className="text-right">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 justify-end">
              <KeyRound className="h-5 w-5" />
              استعادة كلمة المرور
            </DialogTitle>
            <DialogDescription className="text-right">
              {recoveryStep === "username" && "أدخل اسم المستخدم الخاص بك"}
              {recoveryStep === "security" && "أجب على سؤال الأمان"}
              {recoveryStep === "reset" && "أدخل كلمة المرور الجديدة"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {recoveryStep === "username" && (
              <div className="space-y-2">
                <Label htmlFor="forgotUsername">اسم المستخدم</Label>
                <Input
                  id="forgotUsername"
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                  className="text-right"
                />
              </div>
            )}

            {recoveryStep === "security" && recoveryUser && (
              <div className="space-y-2">
                <Label className="font-semibold">سؤال الأمان:</Label>
                <p className="text-sm bg-muted p-3 rounded-md">{recoveryUser.security_question}</p>
                <Label htmlFor="forgotSecurityAnswer">الجواب</Label>
                <Input
                  id="forgotSecurityAnswer"
                  type="text"
                  placeholder="أدخل الجواب"
                  value={forgotSecurityAnswer}
                  onChange={(e) => setForgotSecurityAnswer(e.target.value)}
                  className="text-right"
                />
              </div>
            )}

            {recoveryStep === "reset" && (
              <div className="space-y-2">
                <Label htmlFor="newPasswordForRecovery">كلمة المرور الجديدة</Label>
                <Input
                  id="newPasswordForRecovery"
                  type="password"
                  placeholder="أدخل كلمة المرور الجديدة"
                  value={newPasswordForRecovery}
                  onChange={(e) => setNewPasswordForRecovery(e.target.value)}
                  className="text-right"
                />
              </div>
            )}

            {forgotError && <p className="text-sm text-destructive text-center">{forgotError}</p>}
            {forgotSuccess && <p className="text-sm text-green-600 text-center">{forgotSuccess}</p>}
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowForgotPassword(false)
                resetForgotPasswordForm()
              }}
            >
              إلغاء
            </Button>
            <Button onClick={handleForgotPassword}>{recoveryStep === "reset" ? "تغيير كلمة المرور" : "التالي"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authenticateAgent } from "@/lib/auth/agent-auth"
import { authenticateCustomer } from "@/lib/auth/customer-auth"
import { authenticateAdmin } from "@/lib/auth/admin-auth"

const formSchema = z.object({
  email: z.string().min(1, "Email/Username is required"),
  password: z.string().min(1, "Password is required"),
})

interface LoginFormProps {
  role: "superAdmin" | "admin" | "agent" | "customer"
}

export function LoginForm({ role }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCredentials, setShowCredentials] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      // Handle super admin login
      if (role === "superAdmin") {
        if (values.email === "super" && values.password === "Super@231") {
          sessionStorage.setItem("role", "superAdmin")
          toast.success("Logged in successfully")
          router.push("/admin")
          return
        }
      }

      // Handle admin login
      if (role === "admin") {
        const response = authenticateAdmin({
          username: values.email,
          password: values.password
        })

        if (response.success) {
          sessionStorage.setItem("role", "admin")
          sessionStorage.setItem("adminId", response.admin!.id)
          toast.success("Logged in successfully")
          router.push("/admin")
          return
        } else {
          toast.error(response.message)
          return
        }
      }

      // Handle agent login
      if (role === "agent") {
        const response = authenticateAgent({
          username: values.email,
          password: values.password
        })

        if (response.success) {
          sessionStorage.setItem("role", "agent")
          sessionStorage.setItem("agentId", response.agent!.id)
          toast.success("Logged in successfully")
          router.push("/agent")
          return
        } else {
          toast.error(response.message)
          return
        }
      }

      // Handle customer login
      if (role === "customer") {
        const response = authenticateCustomer({
          username: values.email,
          password: values.password
        })

        if (response.success) {
          sessionStorage.setItem("role", "customer")
          sessionStorage.setItem("customerId", response.customer!.id)
          toast.success("Logged in successfully")
          router.push("/customer")
          return
        } else {
          toast.error(response.message)
          return
        }
      }
    } catch (error) {
      toast.error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {role === "admin" && !showCredentials && (
        <Alert>
          <AlertDescription>
            <Button 
              variant="link" 
              className="h-auto p-0 text-primary"
              onClick={() => setShowCredentials(true)}
            >
              Click here
            </Button>
            {" "}to view demo admin login credentials
          </AlertDescription>
        </Alert>
      )}

      {role === "admin" && showCredentials && (
        <Alert>
          <AlertDescription className="space-y-2">
            <p><strong>Demo Admin 1:</strong></p>
            <p>Username: admin1</p>
            <p>Password: Admin@123</p>
            <div className="h-2" />
            <p><strong>Demo Admin 2:</strong></p>
            <p>Username: admin2</p>
            <p>Password: Admin@456</p>
          </AlertDescription>
        </Alert>
      )}

      {role === "agent" && !showCredentials && (
        <Alert>
          <AlertDescription>
            <Button 
              variant="link" 
              className="h-auto p-0 text-primary"
              onClick={() => setShowCredentials(true)}
            >
              Click here
            </Button>
            {" "}to view demo agent login credentials
          </AlertDescription>
        </Alert>
      )}

      {role === "agent" && showCredentials && (
        <Alert>
          <AlertDescription className="space-y-2">
            <p><strong>Demo Agent 1:</strong></p>
            <p>Username: agent1</p>
            <p>Password: Agent@123</p>
            <div className="h-2" />
            <p><strong>Demo Agent 2:</strong></p>
            <p>Username: agent2</p>
            <p>Password: Agent@456</p>
          </AlertDescription>
        </Alert>
      )}

      {role === "customer" && !showCredentials && (
        <Alert>
          <AlertDescription>
            <Button 
              variant="link" 
              className="h-auto p-0 text-primary"
              onClick={() => setShowCredentials(true)}
            >
              Click here
            </Button>
            {" "}to view demo customer login credentials
          </AlertDescription>
        </Alert>
      )}

      {role === "customer" && showCredentials && (
        <Alert>
          <AlertDescription className="space-y-2">
            <p><strong>Demo Customer 1:</strong></p>
            <p>Username: customer1</p>
            <p>Password: Customer@123</p>
            <div className="h-2" />
            <p><strong>Demo Customer 2:</strong></p>
            <p>Username: customer2</p>
            <p>Password: Customer@456</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email {role === "superAdmin" && "or Username"}</Label>
          <Input
            id="email"
            type="text"
            placeholder="Enter your email or username"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="px-0 font-normal" asChild>
              <Link href="/auth/reset-password">Forgot password?</Link>
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="space-y-4">
        {role === "customer" && (
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Button variant="link" className="px-0" asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </div>
        )}
        {role === "agent" && (
          <div className="text-sm text-center">
            Want to join our sales team?{" "}
            <Button variant="link" className="px-0" asChild>
              <Link href="/auth/agent-application">Apply now</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { signIn } from "@/lib/admin/action/login"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeftIcon } from "lucide-react"

const initialState = {
  message: ""
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit" className="w-full cursor-pointer">
      {pending ? "Loading..." : "Sign In"}
    </Button>
  )
}

export function LoginFormAdmin({ className, ...props }) {
  const [state, formAction] = useActionState(signIn, initialState)

  return (
    <div className={cn("flex flex-col max-w-md mx-auto", className)} {...props}>
      <Link href="/" className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeftIcon size={16} />
        <span>Kembali Ke Dashboard</span>
      </Link>
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.message && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input 
                name="email" 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="w-full" 
                required 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
              </div>
              <Input 
                name="password" 
                id="password" 
                type="password" 
                className="w-full" 
                required 
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 border-t pt-4">
          <div className="text-center text-sm">
            Sign in as:
          </div>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/leader/login" className="text-sm text-blue-600 hover:underline">
              Ketua Divisi
            </Link>
            <Link href="/auth/member/login" className="text-sm text-blue-600 hover:underline">
              Member
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
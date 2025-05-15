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
import { signInMember } from "@/app/auth/member/libs/action"
import Link from "next/link"

const initialState = {
  message: ""
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? "Loading..." : "Sign In"}
    </Button>
  )
}

export function LoginFormMember({ className, ...props }) {
  const [state, formAction] = useActionState(signInMember, initialState)

  return (
    <div className={cn("flex flex-col max-w-md mx-auto", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Member Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.message && <div>{state.message}</div>}
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
            <Link href="/auth/admin/login" className="text-sm text-blue-600 hover:underline">
              Admin
            </Link>
            <Link href="/auth/leader/login" className="text-sm text-blue-600 hover:underline">
              Ketua Divisi
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
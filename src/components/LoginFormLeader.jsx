"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { signInLeader } from "@/app/auth/leader/libs/action"

const initialState = {
  message : ""
}

const SubmitButton = () => {
  const {pending} = useFormStatus()
  return (
      <Button disabled={pending} type="submit" className=" w-full">{pending ? "Loading..." : "Sign In"}</Button>
  )
}

export function LoginFormLeader({className,...props}){

  const [state, formAction] = useActionState(signInLeader, initialState)



  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input name="password" id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
               <SubmitButton/>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}

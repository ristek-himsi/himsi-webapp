"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { signIn } from "@/lib/admin/action/login";

const initialState = {
  message: "",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? "Loading..." : "Sign In"}
    </Button>
  );
};

export function LoginFormAdmin({ className, ...props }) {
  const [state, formAction] = useActionState(signIn, initialState);

  return (
    <div className={cn("flex flex-col gap-6 max-w-md mx-auto", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login Admin</CardTitle>
          <CardDescription>Masukkan email dan kata sandi untuk login sebagai admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {state.message && (
              <div className="text-red-600 text-sm text-center">{state.message}</div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                name="password"
                id="password"
                type="password"
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
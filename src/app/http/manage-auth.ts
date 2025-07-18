"use server"

import { auth, signIn, signOut } from "@/app/lib/auth"

export async function Auth() {
  const session = await auth()

  if (!session) {
    return await signIn("google", {
      redirectTo: "/create"
    })
  }

  return await signOut({
    redirectTo: "/"
  })
}
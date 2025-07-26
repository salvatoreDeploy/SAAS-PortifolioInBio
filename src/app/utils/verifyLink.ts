"use server"

import { database } from "../lib/firebase"

export async function verifyLink(url: string) {
  const snapShot = await database.collection("profiles").doc(url).get()

  return snapShot.exists
}
"use server"

import { Timestamp } from "firebase-admin/firestore"
import { database } from "../lib/firebase"
import { auth } from "../lib/auth";

export async function createProfileLink(url: string) {

  const session = await auth();

  if (!session?.user) {
    return 
  }

  try {
    await database.collection("profiles").doc(url).set({
    userId: session.user.id,
    totalVisits: 0,
    createdAt: Timestamp.now().toMillis()
    
    })
    return true
  } catch (error) {
    return false
  }
}
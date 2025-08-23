import "server-only"

import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"


// Certificado

/* const privateKeyFormatted = (process.env.FIREBASE_PRIVATE_KEY || "").replace(
  /\\n/g,
  "\n"
); */

if (!process.env.FIREBASE_PRIVATE_KEY_BASE64) {
  throw new Error('Variable ambient not exists')
}

const decodedKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, "base64").toString("utf-8")

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY_BASE64!.replace(/\\n/g, "\n")
})

// Instancia do App

if (getApps().length === 0) {
  initializeApp({
    credential: firebaseCert,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  })
}

export const database = getFirestore()

export const storage = getStorage().bucket()




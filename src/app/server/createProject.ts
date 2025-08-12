"use server"

import { Timestamp } from "firebase-admin/firestore"
import { auth } from "../lib/auth"
import { database } from "../lib/firebase"
import { randomUUID } from "node:crypto"


/* TODO: Isolar componente API do CloudFlare */

// Configuração do cliente R2 usando AWS SDK
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function createProject(formData: FormData) {

  const session = await auth()

  if (!session) {
    return
  }

  const profileId = formData.get("profileId") as string
  const projectName = formData.get("projectName") as string
  const projectDescription = formData.get("projectDescription") as string
  const projectUrl = formData.get("projectUrl") as string
  const file = formData.get("file") as File

  const generatedId = randomUUID()

  // Substituindo Firebase Storage por Cloudflare R2
  const fileName = `projects-images/${profileId}/${generatedId}`
  
  try {
    // Upload para Cloudflare R2 usando AWS SDK
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const putCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type || "image/jpeg"
    })

    await r2Client.send(putCommand)

    const imagePath = fileName

    // Mantendo o Firestore como estava
    await database.collection("projects").doc(profileId).collection("projects").doc(generatedId).set({
      userId: session.user?.id,
      projectName,
      projectDescription,
      projectUrl,
      imagePath,
      createdAt: Timestamp.now().toMillis()
    })

    return true
  } catch (error) {
    console.log(error)

    // Tentar limpar a imagem do R2 se algo deu errado
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileName
      })
      await r2Client.send(deleteCommand)
    } catch (cleanupError) {
      console.error("Error cleaning up R2 image:", cleanupError)
    }

    return false
  }
}

/* 

// Função auxiliar para obter URL da imagem do R2
export async function getImageUrl(imagePath: string): Promise<string> {
  // Se você configurou um domínio personalizado para o R2
  return `https://your-r2-domain.com/${imagePath}`
  
  // Ou se estiver usando a URL padrão do R2
  // return `https://your-account-id.r2.cloudflarestorage.com/your-bucket/${imagePath}`
} 
  
*/


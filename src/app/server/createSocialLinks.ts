"use server"

import { Timestamp } from "firebase-admin/firestore";
import { database } from "../lib/firebase";
import { auth } from "../lib/auth";

interface CreateSocialLinksParams {
  profileId: string,
  github: string,
  instagram: string,
  linkedin: string,
  twitter: string,
}

export async function createSocialLinks({ profileId, github, instagram, linkedin, twitter }: CreateSocialLinksParams) {
  
  const session = await auth()

  if (!session?.user?.email) {
    return false
  }

  try {
    await database.collection("profiles").doc(profileId).update({
        socialMedias: {
          github,
          instagram,
          linkedin,
          twitter
        },
        updatedAt: Timestamp.now()
      }
    )
      return true
  }
  catch (error) {
    console.error(error)
    return false
  }
}
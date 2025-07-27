import "server-only"
import { database } from "../lib/firebase";

export type ProfileDataResponse = {
  userId: string
  totalVisits: number
  createdAt: number
}

export async function getProfileData(profileId: string): Promise<ProfileDataResponse> {
  const snapShot = await database.collection("profiles").doc(profileId).get()
  
  return snapShot.data() as ProfileDataResponse
}
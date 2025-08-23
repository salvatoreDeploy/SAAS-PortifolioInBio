import { database } from "../lib/firebase";


export type ProjectData = {
  id: string
  userId: string
  projectName: string
  projectDescription: string
  projectUrl: string
  imagePath: string
  totalVisits?: number
  createdAt: number
}

export async function getProfileProjectData(profileId: string) {
  const snapshot = await database.collection("projects").doc(profileId).collection("projects").get()

  return snapshot.docs.map((doc) => doc.data()) as ProjectData[]
}
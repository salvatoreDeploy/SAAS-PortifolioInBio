"use server"

import { database } from "../lib/firebase";

type LinkCustomParam = {
  title: string;
  url: string;
};


export async function createCustomLink(profileId: string, link: LinkCustomParam) {
  try { 
      const profileRef = database.collection("profiles").doc(profileId);
      
      // Primeiro, buscar os links existentes
      const profileDoc = await profileRef.get();
      const currentData = profileDoc.data();
      const currentLinks = currentData?.links || [];
      
      // Adicionar o novo link ao array
      const updatedLinks = [...currentLinks, link];
    
    await profileRef.update({links: updatedLinks})
  } catch (error) {
    console.log(error)
  }
}
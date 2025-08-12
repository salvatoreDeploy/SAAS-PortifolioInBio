import imageCompression from "browser-image-compression"

export async function compressFile(files: File[]) {
  const comprossPromises = files.map(async (file) => {
    try {
     return await compressImage(file)

    } catch (error) {
      console.log(error)
      return null
   }
  })

  return (await Promise.all(comprossPromises)).filter((file) => file !== null)
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const options = {
      maxSizeMB: 0.2, // 200kb
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/*"
    }

    imageCompression(file, options).then((compresedFile) => {
      resolve(compresedFile)
    })
  })
}
export function formatedURL(url: string) {
  const newUrl= url.startsWith("http") ? url : `https://${url}`;

  return newUrl
}